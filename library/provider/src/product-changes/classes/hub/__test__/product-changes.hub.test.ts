import { type AuthServiceInterface, type ConfigInterface } from '@library/domain';
import {
  type SocketIOConnectionInterface,
  type SocketIOConnectionOptions,
  type SocketIOConnectionsInterface,
  type SocketIORealtimeDeliveryHandler,
} from '@library/socket-io';
import { ProductChangesHub } from '../product-changes.hub.ts';

describe('ProductChangesHub', () => {
  it('gets a short-lived ticket and opens the products transport lazily', async () => {
    const fixture = createFixture();

    new ProductChangesHub(fixture.config, fixture.auth, fixture.connections);

    expect(fixture.connections.get).toHaveBeenCalledWith(
      'http://localhost:4040',
      expect.objectContaining({
        addTrailingSlash: false,
        forceNew: true,
        path: '/socket.io/products',
        transports: ['websocket'],
        withCredentials: true,
      }),
    );

    const options = fixture.connections.get.mock.calls[0]?.[1];
    const auth = options?.auth;

    expect(typeof auth).toBe('function');

    const callback = vi.fn();

    if (typeof auth === 'function') {
      auth(callback);
    }

    await vi.waitFor(() => expect(callback).toHaveBeenCalledWith({ ticket: 'socket-ticket' }));
    expect(fixture.auth.issueSocketTicket).toHaveBeenCalledOnce();
  });

  it('does not send credentials when the user session cannot issue a ticket', async () => {
    const fixture = createFixture();
    fixture.auth.issueSocketTicket.mockRejectedValueOnce(new Error('Unauthorized'));

    new ProductChangesHub(fixture.config, fixture.auth, fixture.connections);

    const auth = fixture.connections.get.mock.calls[0]?.[1]?.auth;
    const callback = vi.fn();

    if (typeof auth === 'function') {
      auth(callback);
    }

    await vi.waitFor(() => expect(callback).toHaveBeenCalledWith({}));
  });

  it('subscribes to product.updated and passes a validated product payload to the listener', async () => {
    const fixture = createFixture();
    const hub = new ProductChangesHub(fixture.config, fixture.auth, fixture.connections);
    const listener = { updated: vi.fn(async () => undefined) };

    hub.subscribe(listener);
    await fixture.emit(createProductPayload());

    expect(fixture.connection.subscribeDelivery).toHaveBeenCalledWith('product.updated', expect.any(Function));
    expect(listener.updated).toHaveBeenCalledWith('39782b12-1077-4b75-94d2-c783e2ce8817', 5);
  });

  it('rejects an invalid product payload', async () => {
    const fixture = createFixture();
    const hub = new ProductChangesHub(fixture.config, fixture.auth, fixture.connections);
    const listener = { updated: vi.fn(async () => undefined) };

    hub.subscribe(listener);

    await expect(fixture.emit({ productUuid: 'not-a-uuid', version: 0 })).rejects.toThrow(
      'product.updated has an invalid payload.',
    );

    expect(listener.updated).not.toHaveBeenCalled();
  });
});

const createFixture = () => {
  let handler: SocketIORealtimeDeliveryHandler | undefined;
  const connection = {
    subscribeDelivery: vi.fn((_eventType: string, subscribedHandler: SocketIORealtimeDeliveryHandler) => {
      handler = subscribedHandler;

      return { dispose: vi.fn(async () => undefined) };
    }),
  } as unknown as SocketIOConnectionInterface & {
    subscribeDelivery: ReturnType<typeof vi.fn>;
  };
  const connections = {
    get: vi.fn((_url: string, _options?: SocketIOConnectionOptions) => connection),
  } as unknown as SocketIOConnectionsInterface & {
    get: ReturnType<typeof vi.fn>;
  };
  const auth = {
    issueSocketTicket: vi.fn(async () => ({
      expiresAt: '2026-08-08T12:05:00.000Z',
      ticket: 'socket-ticket',
    })),
  } as unknown as AuthServiceInterface & {
    issueSocketTicket: ReturnType<typeof vi.fn>;
  };
  const config = {
    get: vi.fn(() => 'http://localhost:4040'),
  } as unknown as ConfigInterface;
  return {
    auth,
    config,
    connection,
    connections,
    async emit(payload: unknown) {
      if (!handler) {
        throw new Error('Realtime event handler is not subscribed.');
      }

      await handler(payload, undefined as never);
    },
  };
};

const createProductPayload = () => ({
  productUuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
  version: 5,
});
