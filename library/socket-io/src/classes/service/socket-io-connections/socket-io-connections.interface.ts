import type { ManagerOptions, SocketOptions } from 'socket.io-client';

export type SocketIOConnectionErrorContext = 'handler' | 'reconnect' | 'start' | 'stop';

export interface SocketIOConnectionError {
  readonly context: SocketIOConnectionErrorContext;
  readonly error: unknown;
  readonly event?: string;
}

export type SocketIOConnectionErrorHandler = (error: SocketIOConnectionError) => void | Promise<void>;

export type SocketIOConnectionHandler<TArguments extends unknown[] = unknown[]> = (
  ...arguments_: TArguments
) => void | Promise<void>;

export interface SocketIOConnectionSubscriptionOptions {
  readonly onError?: SocketIOConnectionErrorHandler;
}

export interface SocketIOConnectionSubscription {
  dispose(): Promise<void>;
}

export type SocketIOConnectionOptions = Omit<Partial<ManagerOptions & SocketOptions>, 'autoConnect'>;

export interface SocketIOConnectionInterface {
  subscribe<TArguments extends unknown[]>(
    event: string,
    handler: SocketIOConnectionHandler<TArguments>,
    options?: SocketIOConnectionSubscriptionOptions,
  ): SocketIOConnectionSubscription;
}

export abstract class SocketIOConnectionsInterface {
  abstract get(url: string, options?: SocketIOConnectionOptions): SocketIOConnectionInterface;
}
