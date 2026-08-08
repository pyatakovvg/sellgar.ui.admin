import { type AuthServiceInterface, type ConfigInterface } from '@library/domain';
import {
  type SocketIOConnectionInterface,
  type SocketIOConnectionOptions,
  type SocketIOConnectionsInterface,
  type SocketIORealtimeDeliveryHandler,
} from '@library/socket-io';

import { StoreOfferChangesHub } from '../store-offer-changes.hub.ts';

describe('StoreOfferChangesHub', () => {
  it('subscribes to store.product.updated and validates its payload', async () => {
    const fixture = createFixture();
    const hub = new StoreOfferChangesHub(fixture.config, fixture.auth, fixture.connections);
    const listener = { updated: vi.fn(async () => undefined) };

    hub.subscribe(listener);
    await fixture.emit({
      storeProductUuid: '5b7e713c-f6c6-4450-b1dc-767a7458bf55',
      version: 8,
    });

    expect(fixture.connections.get).toHaveBeenCalledWith(
      'http://localhost:4040',
      expect.objectContaining({
        addTrailingSlash: false,
        forceNew: true,
        path: '/socket.io/store',
        transports: ['websocket'],
        withCredentials: true,
      }),
    );
    expect(fixture.connection.subscribeDelivery).toHaveBeenCalledWith('store.product.updated', expect.any(Function));
    expect(listener.updated).toHaveBeenCalledWith('5b7e713c-f6c6-4450-b1dc-767a7458bf55', 8);
  });

  it('rejects an invalid store product payload', async () => {
    const fixture = createFixture();
    const hub = new StoreOfferChangesHub(fixture.config, fixture.auth, fixture.connections);
    const listener = { updated: vi.fn(async () => undefined) };

    hub.subscribe(listener);
    await expect(fixture.emit({ storeProductUuid: 'invalid', version: 0 })).rejects.toThrow(
      'store.product.updated has an invalid payload.',
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
  } as unknown as SocketIOConnectionInterface & { subscribeDelivery: ReturnType<typeof vi.fn> };
  const connections = {
    get: vi.fn((_url: string, _options?: SocketIOConnectionOptions) => connection),
  } as unknown as SocketIOConnectionsInterface & { get: ReturnType<typeof vi.fn> };
  const auth = {
    issueSocketTicket: vi.fn(async () => ({
      expiresAt: '2026-08-08T12:05:00.000Z',
      ticket: 'socket-ticket',
    })),
  } as unknown as AuthServiceInterface;
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
