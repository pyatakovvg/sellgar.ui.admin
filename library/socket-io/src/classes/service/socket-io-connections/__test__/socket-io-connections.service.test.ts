const socketIOMock = vi.hoisted(() => ({
  io: vi.fn(),
}));

vi.mock('socket.io-client', () => ({
  io: socketIOMock.io,
}));

import { SocketIOConnections } from '../socket-io-connections.service.ts';

describe('SocketIOConnections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns one connection for the same endpoint', () => {
    socketIOMock.io.mockReturnValue(createSocket());
    const connections = new SocketIOConnections();

    const first = connections.get('/updates');
    const second = connections.get('/updates');

    expect(first).toBe(second);
    expect(socketIOMock.io).toHaveBeenCalledOnce();
  });

  it('creates independent connections for different endpoints', () => {
    socketIOMock.io.mockImplementation(() => createSocket());
    const connections = new SocketIOConnections();

    const terminalUpdates = connections.get('/terminals');
    const incidentUpdates = connections.get('/incidents');

    expect(terminalUpdates).not.toBe(incidentUpdates);
    expect(socketIOMock.io).toHaveBeenCalledTimes(2);
  });

  it('creates independent physical connections for different transport paths', () => {
    socketIOMock.io.mockImplementation(() => createSocket());
    const connections = new SocketIOConnections();

    const products = connections.get('http://localhost:4040', { path: '/socket.io/products' });
    const store = connections.get('http://localhost:4040', { path: '/socket.io/store' });

    expect(products).not.toBe(store);
    expect(socketIOMock.io).toHaveBeenCalledTimes(2);
  });

  it('forwards endpoint-specific transport options and disables eager connection', () => {
    socketIOMock.io.mockReturnValue(createSocket());
    const connections = new SocketIOConnections();

    connections.get('/incidents', { transports: ['websocket'], withCredentials: true });

    expect(socketIOMock.io).toHaveBeenCalledWith('/incidents', {
      autoConnect: false,
      transports: ['websocket'],
      withCredentials: true,
    });
  });
});

const createSocket = () => ({
  active: false,
  connected: false,
  connect: vi.fn(),
  disconnect: vi.fn(),
  io: {
    off: vi.fn(),
    on: vi.fn(),
  },
  off: vi.fn(),
  on: vi.fn(),
});
