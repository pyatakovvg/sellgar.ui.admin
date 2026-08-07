import { io, type Socket } from 'socket.io-client';

import type {
  SocketIOConnectionError,
  SocketIOConnectionHandler,
  SocketIOConnectionInterface,
  SocketIOConnectionOptions,
  SocketIOConnectionSubscription,
  SocketIOConnectionSubscriptionOptions,
} from '../../service/socket-io-connections/socket-io-connections.interface.ts';

const RECONNECT_DELAYS = [0, 2_000, 10_000, 30_000, 60_000] as const;

interface SocketIOSubscriber {
  readonly handler: SocketIOConnectionHandler;
  readonly onError?: SocketIOConnectionSubscriptionOptions['onError'];
}

interface SocketIOEventSubscribers {
  readonly dispatcher: SocketIOConnectionHandler;
  readonly subscribers: Set<SocketIOSubscriber>;
}

export class SocketIOConnection implements SocketIOConnectionInterface {
  private readonly socket: Socket;
  private readonly events = new Map<string, SocketIOEventSubscribers>();
  private retryAttempt = 0;
  private retryTimer: ReturnType<typeof setTimeout> | undefined;
  private subscriberCount = 0;
  private connectedOnce = false;
  private disposed = false;

  constructor(url: string, options: SocketIOConnectionOptions = {}) {
    this.socket = io(url, {
      ...options,
      autoConnect: false,
    });
    this.socket.on('connect', this.handleConnect);
    this.socket.on('connect_error', this.handleConnectError);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.io.on('reconnect_error', this.handleReconnectError);
    this.socket.io.on('reconnect_failed', this.handleReconnectFailed);
  }

  subscribe<TArguments extends unknown[]>(
    event: string,
    handler: SocketIOConnectionHandler<TArguments>,
    options: SocketIOConnectionSubscriptionOptions = {},
  ): SocketIOConnectionSubscription {
    this.assertActive();

    const eventSubscribers = this.getOrCreateEventSubscribers(event);
    const subscriber: SocketIOSubscriber = {
      handler: handler as SocketIOConnectionHandler,
      onError: options.onError,
    };

    eventSubscribers.subscribers.add(subscriber);
    this.subscriberCount += 1;
    this.applyDesiredState();

    let active = true;

    return {
      dispose: async () => {
        if (!active) {
          return;
        }

        active = false;
        this.releaseSubscriber(event, subscriber);
        this.applyDesiredState();
      },
    };
  }

  async dispose(): Promise<void> {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.clearRetry();

    for (const [event, eventSubscribers] of this.events) {
      this.socket.off(event, eventSubscribers.dispatcher);
    }

    this.events.clear();
    this.subscriberCount = 0;
    this.socket.off('connect', this.handleConnect);
    this.socket.off('connect_error', this.handleConnectError);
    this.socket.off('disconnect', this.handleDisconnect);
    this.socket.io.off('reconnect_error', this.handleReconnectError);
    this.socket.io.off('reconnect_failed', this.handleReconnectFailed);
    this.disconnect();
  }

  private readonly handleConnect = () => {
    this.connectedOnce = true;
    this.retryAttempt = 0;
    this.clearRetry();
  };

  private readonly handleConnectError = (error: unknown) => {
    this.reportError({
      context: this.connectedOnce ? 'reconnect' : 'start',
      error,
    });

    if (!this.socket.active) {
      this.scheduleRetry();
    }
  };

  private readonly handleDisconnect = (reason: string) => {
    if (!this.hasSubscribers || this.socket.active || reason === 'io client disconnect') {
      return;
    }

    this.reportError({
      context: 'reconnect',
      error: new Error(`Socket.IO connection disconnected: ${reason}`),
    });
    this.scheduleRetry();
  };

  private readonly handleReconnectError = (error: unknown) => {
    this.reportError({ context: 'reconnect', error });
  };

  private readonly handleReconnectFailed = () => {
    this.reportError({
      context: 'reconnect',
      error: new Error('Socket.IO reconnect attempts exhausted.'),
    });
    this.scheduleRetry();
  };

  private get hasSubscribers(): boolean {
    return !this.disposed && this.subscriberCount > 0;
  }

  private getOrCreateEventSubscribers(event: string): SocketIOEventSubscribers {
    const eventSubscribers = this.events.get(event);

    if (eventSubscribers) {
      return eventSubscribers;
    }

    const subscribers = new Set<SocketIOSubscriber>();
    const dispatcher: SocketIOConnectionHandler = (...arguments_) => {
      for (const subscriber of [...subscribers]) {
        void Promise.resolve()
          .then(() => subscriber.handler(...arguments_))
          .catch((error: unknown) => {
            this.reportSubscriberError(subscriber, {
              context: 'handler',
              error,
              event,
            });
          });
      }
    };
    const createdEventSubscribers: SocketIOEventSubscribers = {
      dispatcher,
      subscribers,
    };

    this.events.set(event, createdEventSubscribers);
    this.socket.on(event, dispatcher);

    return createdEventSubscribers;
  }

  private releaseSubscriber(event: string, subscriber: SocketIOSubscriber): void {
    const eventSubscribers = this.events.get(event);

    if (!eventSubscribers?.subscribers.delete(subscriber)) {
      return;
    }

    this.subscriberCount -= 1;

    if (eventSubscribers.subscribers.size > 0) {
      return;
    }

    this.events.delete(event);
    this.socket.off(event, eventSubscribers.dispatcher);
  }

  private applyDesiredState(): void {
    if (!this.hasSubscribers) {
      this.clearRetry();
      this.retryAttempt = 0;
      this.disconnect();
      return;
    }

    if (this.socket.connected || this.socket.active || this.retryTimer !== undefined) {
      return;
    }

    try {
      this.socket.connect();
    } catch (error) {
      this.reportError({
        context: this.connectedOnce ? 'reconnect' : 'start',
        error,
      });
      this.scheduleRetry();
    }
  }

  private disconnect(): void {
    if (!this.socket.connected && !this.socket.active) {
      return;
    }

    try {
      this.socket.disconnect();
    } catch (error) {
      this.reportError({ context: 'stop', error });
      throw error;
    }
  }

  private scheduleRetry(): void {
    if (!this.hasSubscribers || this.retryTimer !== undefined) {
      return;
    }

    const delayIndex = Math.min(this.retryAttempt, RECONNECT_DELAYS.length - 1);
    const delay = RECONNECT_DELAYS[delayIndex] ?? 0;

    this.retryAttempt += 1;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = undefined;
      this.applyDesiredState();
    }, delay);
  }

  private clearRetry(): void {
    if (this.retryTimer === undefined) {
      return;
    }

    clearTimeout(this.retryTimer);
    this.retryTimer = undefined;
  }

  private reportError(error: SocketIOConnectionError): void {
    for (const eventSubscribers of this.events.values()) {
      for (const subscriber of eventSubscribers.subscribers) {
        this.reportSubscriberError(subscriber, error);
      }
    }
  }

  private reportSubscriberError(subscriber: SocketIOSubscriber, error: SocketIOConnectionError): void {
    if (!subscriber.onError) {
      return;
    }

    void Promise.resolve(subscriber.onError(error)).catch(() => undefined);
  }

  private assertActive(): void {
    if (this.disposed) {
      throw new Error('Socket.IO connection уже освобождён.');
    }
  }
}
