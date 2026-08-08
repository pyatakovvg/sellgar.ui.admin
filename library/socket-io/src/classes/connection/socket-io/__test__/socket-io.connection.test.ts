const socketIOMock = vi.hoisted(() => ({
  io: vi.fn(),
}));

vi.mock('socket.io-client', () => ({
  io: socketIOMock.io,
}));

import { SocketIOConnection } from '../socket-io.connection.ts';

describe('SocketIOConnection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('connects on first demand and delivers once to every subscription', async () => {
    const socket = createSocket();
    const handler = vi.fn();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/terminals');

    const firstSubscription = connection.subscribe('terminal.updated', handler);
    const secondSubscription = connection.subscribe('terminal.updated', handler);

    expect(socket.connect).toHaveBeenCalledOnce();
    expect(socket.on).toHaveBeenCalledWith('terminal.updated', expect.any(Function));

    socket.dispatch('terminal.updated', { id: '1' });

    await vi.waitFor(() => expect(handler).toHaveBeenCalledTimes(2));

    await firstSubscription.dispose();

    expect(socket.off).not.toHaveBeenCalledWith('terminal.updated', expect.any(Function));
    expect(socket.disconnect).not.toHaveBeenCalled();

    await secondSubscription.dispose();

    expect(socket.off).toHaveBeenCalledWith('terminal.updated', expect.any(Function));
    expect(socket.disconnect).toHaveBeenCalledOnce();
  });

  it('registers one Socket.IO dispatcher for each server event', async () => {
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/updates');

    const terminalSubscription = connection.subscribe('terminal.updated', vi.fn());
    const incidentSubscription = connection.subscribe('incident.updated', vi.fn());

    expect(socket.on).toHaveBeenCalledWith('terminal.updated', expect.any(Function));
    expect(socket.on).toHaveBeenCalledWith('incident.updated', expect.any(Function));

    await terminalSubscription.dispose();
    await incidentSubscription.dispose();
  });

  it('isolates a failed handler and reports it to its subscription', async () => {
    const error = new Error('Invalid event.');
    const onError = vi.fn();
    const successfulHandler = vi.fn();
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/updates');
    const failedSubscription = connection.subscribe(
      'terminal.updated',
      () => {
        throw error;
      },
      { onError },
    );
    const successfulSubscription = connection.subscribe('terminal.updated', successfulHandler);

    socket.dispatch('terminal.updated', { id: '1' });

    await vi.waitFor(() => expect(successfulHandler).toHaveBeenCalledOnce());
    expect(onError).toHaveBeenCalledWith({
      context: 'handler',
      error,
      event: 'terminal.updated',
    });

    await failedSubscription.dispose();
    await successfulSubscription.dispose();
  });

  it('reports initial connection errors and lets the active manager reconnect', async () => {
    const error = new Error('Connection failed.');
    const onError = vi.fn();
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/updates');
    const subscription = connection.subscribe('terminal.updated', vi.fn(), { onError });

    socket.active = true;
    socket.dispatch('connect_error', error);

    expect(onError).toHaveBeenCalledWith({ context: 'start', error });
    expect(socket.connect).toHaveBeenCalledOnce();

    await subscription.dispose();
  });

  it('reconnects after a server-forced disconnect while demand remains', async () => {
    vi.useFakeTimers();
    const onError = vi.fn();
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/updates');
    const subscription = connection.subscribe('terminal.updated', vi.fn(), { onError });

    socket.connected = true;
    socket.dispatch('connect');
    socket.connected = false;
    socket.active = false;
    socket.dispatch('disconnect', 'io server disconnect');

    await vi.advanceTimersByTimeAsync(0);

    expect(socket.connect).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledWith({
      context: 'reconnect',
      error: expect.objectContaining({ message: 'Socket.IO connection disconnected: io server disconnect' }),
    });

    await subscription.dispose();
  });

  it('does not reset reconnect backoff after a connection rejected immediately by the server', async () => {
    vi.useFakeTimers();
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/realtime');
    const subscription = connection.subscribe('realtime.event.v1', vi.fn());

    rejectConnection(socket);
    await vi.advanceTimersByTimeAsync(0);

    expect(socket.connect).toHaveBeenCalledTimes(2);

    rejectConnection(socket);
    await vi.advanceTimersByTimeAsync(1_999);

    expect(socket.connect).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(1);

    expect(socket.connect).toHaveBeenCalledTimes(3);

    rejectConnection(socket);
    await vi.advanceTimersByTimeAsync(9_999);

    expect(socket.connect).toHaveBeenCalledTimes(3);

    await vi.advanceTimersByTimeAsync(1);

    expect(socket.connect).toHaveBeenCalledTimes(4);

    await subscription.dispose();
  });

  it('configures the endpoint without connecting eagerly', () => {
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);

    new SocketIOConnection('/incidents', {
      auth: { token: 'token' },
      transports: ['websocket'],
      withCredentials: true,
    });

    expect(socketIOMock.io).toHaveBeenCalledWith('/incidents', {
      auth: { token: 'token' },
      autoConnect: false,
      transports: ['websocket'],
      withCredentials: true,
    });
    expect(socket.connect).not.toHaveBeenCalled();
  });

  it('sends a request through Socket.IO acknowledgement with a timeout', async () => {
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/realtime');

    await expect(
      connection.request('realtime.ack.v1', { room: 'user:user-1', sequence: '42' }, { timeoutMs: 5_000 }),
    ).resolves.toEqual({ room: 'user:user-1', sequence: '42' });

    expect(socket.timeout).toHaveBeenCalledWith(5_000);
    expect(socket.emitWithAck).toHaveBeenCalledWith('realtime.ack.v1', {
      room: 'user:user-1',
      sequence: '42',
    });
  });

  it('routes a realtime delivery and acknowledges it only after its handler completes', async () => {
    const socket = createSocket();
    const handler = vi.fn(async () => undefined);
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/realtime');
    const subscription = connection.subscribeDelivery('product.updated', handler);
    const delivery = createDelivery();

    socket.dispatch('realtime.event.v1', delivery);

    await vi.waitFor(() => expect(socket.emitWithAck).toHaveBeenCalledOnce());

    expect(handler).toHaveBeenCalledWith(delivery.payload, delivery);
    expect(socket.timeout).toHaveBeenCalledWith(5_000);
    expect(socket.emitWithAck).toHaveBeenCalledWith('realtime.ack.v1', {
      room: 'user:66713624-6013-46b1-97c9-0f0166594491',
      sequence: '42',
    });
    expect(handler.mock.invocationCallOrder[0]).toBeLessThan(
      socket.emitWithAck.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );

    await subscription.dispose();
  });

  it('reconnects without acknowledging when a realtime delivery handler fails', async () => {
    const error = new Error('Product was not applied.');
    const onError = vi.fn();
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/realtime');
    const subscription = connection.subscribeDelivery(
      'product.updated',
      () => {
        throw error;
      },
      { onError },
    );

    socket.dispatch('realtime.event.v1', createDelivery());

    await vi.waitFor(() => expect(socket.connect).toHaveBeenCalledTimes(2));

    expect(socket.emitWithAck).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({
      context: 'handler',
      error,
      event: 'product.updated',
    });

    await subscription.dispose();
  });

  it('reconnects an active demanded connection explicitly', async () => {
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/realtime');
    const subscription = connection.subscribe('realtime.event.v1', vi.fn());

    connection.reconnect();

    expect(socket.disconnect).toHaveBeenCalledOnce();
    await vi.waitFor(() => expect(socket.connect).toHaveBeenCalledTimes(2));

    await subscription.dispose();
  });

  it('disconnects and rejects new subscriptions after final disposal', async () => {
    const socket = createSocket();
    socketIOMock.io.mockReturnValue(socket);
    const connection = new SocketIOConnection('/updates');

    connection.subscribe('terminal.updated', vi.fn());

    await connection.dispose();

    expect(socket.off).toHaveBeenCalledWith('terminal.updated', expect.any(Function));
    expect(socket.disconnect).toHaveBeenCalledOnce();
    expect(() => connection.subscribe('terminal.updated', vi.fn())).toThrow('Socket.IO connection уже освобождён.');
  });
});

const createSocket = () => {
  const eventHandlers = new Map<string, Set<(...arguments_: unknown[]) => void>>();
  const managerHandlers = new Map<string, Set<(...arguments_: unknown[]) => void>>();
  const socket = {
    active: false,
    connected: false,
    connect: vi.fn(),
    disconnect: vi.fn(),
    emitWithAck: vi.fn(async (_event: string, payload: unknown) => payload),
    io: {
      off: vi.fn((event: string, handler: (...arguments_: unknown[]) => void) => {
        managerHandlers.get(event)?.delete(handler);
      }),
      on: vi.fn((event: string, handler: (...arguments_: unknown[]) => void) => {
        const handlers = managerHandlers.get(event) ?? new Set();

        handlers.add(handler);
        managerHandlers.set(event, handlers);
      }),
    },
    off: vi.fn((event: string, handler: (...arguments_: unknown[]) => void) => {
      eventHandlers.get(event)?.delete(handler);
    }),
    on: vi.fn((event: string, handler: (...arguments_: unknown[]) => void) => {
      const handlers = eventHandlers.get(event) ?? new Set();

      handlers.add(handler);
      eventHandlers.set(event, handlers);
    }),
    timeout: vi.fn(),
    dispatch(event: string, ...arguments_: unknown[]) {
      for (const handler of eventHandlers.get(event) ?? []) {
        handler(...arguments_);
      }
    },
    dispatchManager(event: string, ...arguments_: unknown[]) {
      for (const handler of managerHandlers.get(event) ?? []) {
        handler(...arguments_);
      }
    },
  };

  socket.timeout.mockReturnValue(socket);

  socket.connect.mockImplementation(() => {
    socket.active = true;
    return socket;
  });
  socket.disconnect.mockImplementation(() => {
    socket.active = false;
    socket.connected = false;
    return socket;
  });

  return socket;
};

const createDelivery = () => ({
  audience: {
    type: 'user',
    uuid: '66713624-6013-46b1-97c9-0f0166594491',
  },
  deliveryId: 'd40e2681-2898-473a-98cc-0f5a76265310',
  eventType: 'product.updated',
  expiresAt: '2026-08-08T12:05:00.000Z',
  occurredAt: '2026-08-08T12:00:00.000Z',
  payload: {
    productUuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
    version: 5,
  },
  schemaVersion: 1,
  sequence: '42',
});

const rejectConnection = (socket: ReturnType<typeof createSocket>) => {
  socket.connected = true;
  socket.dispatch('connect');
  socket.connected = false;
  socket.active = false;
  socket.dispatch('disconnect', 'io server disconnect');
};
