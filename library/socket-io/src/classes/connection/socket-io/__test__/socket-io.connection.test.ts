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
