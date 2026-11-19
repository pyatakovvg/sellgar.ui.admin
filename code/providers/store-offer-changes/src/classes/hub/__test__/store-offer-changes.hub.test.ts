import { StoreProductEntity, type AuthServiceInterface, type ConfigInterface } from '@library/domain';
import {
  type SocketIOConnectionInterface,
  type SocketIOConnectionOptions,
  type SocketIOConnectionsInterface,
  type SocketIORealtimeDeliveryHandler,
} from '@library/socket-io';

import { StoreOfferChangesHub } from '../store-offer-changes.hub.ts';

describe('StoreOfferChangesHub', () => {
  it.each(['created', 'updated'] as const)(
    'subscribes to store.product.%s and validates its payload',
    async (change) => {
      const fixture = createFixture();
      const hub = new StoreOfferChangesHub(fixture.config, fixture.auth, fixture.connections);
      const listener = { created: vi.fn(async () => undefined), updated: vi.fn(async () => undefined) };

      hub.subscribe(listener);
      await fixture.emit(`store.product.${change}`, createStoreProductPayload());

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
      expect(fixture.connection.subscribeDelivery).toHaveBeenCalledWith(
        `store.product.${change}`,
        expect.any(Function),
      );
      expect(listener[change]).toHaveBeenCalledWith(expect.any(StoreProductEntity));
      expect(listener[change]).toHaveBeenCalledWith(
        expect.objectContaining({
          uuid: '5b7e713c-f6c6-4450-b1dc-767a7458bf55',
          version: 8,
        }),
      );
    },
  );

  it('disposes both delivery subscriptions', async () => {
    const fixture = createFixture();
    const hub = new StoreOfferChangesHub(fixture.config, fixture.auth, fixture.connections);
    const dispose = hub.subscribe({ created: vi.fn(), updated: vi.fn() });

    await dispose();

    expect(fixture.disposals).toHaveLength(2);
    for (const subscriptionDispose of fixture.disposals) {
      expect(subscriptionDispose).toHaveBeenCalledOnce();
    }
  });

  it('rejects an invalid store product payload', async () => {
    const fixture = createFixture();
    const hub = new StoreOfferChangesHub(fixture.config, fixture.auth, fixture.connections);
    const listener = { created: vi.fn(async () => undefined), updated: vi.fn(async () => undefined) };

    hub.subscribe(listener);
    await expect(fixture.emit('store.product.updated', { uuid: 'invalid' })).rejects.toBeDefined();
    expect(listener.updated).not.toHaveBeenCalled();
  });
});

const createFixture = () => {
  const handlers = new Map<string, SocketIORealtimeDeliveryHandler>();
  const disposals: ReturnType<typeof vi.fn>[] = [];
  const connection = {
    subscribeDelivery: vi.fn((eventType: string, subscribedHandler: SocketIORealtimeDeliveryHandler) => {
      handlers.set(eventType, subscribedHandler);
      const dispose = vi.fn(async () => undefined);
      disposals.push(dispose);
      return { dispose };
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
    disposals,
    async emit(eventType: string, payload: unknown) {
      const handler = handlers.get(eventType);
      if (!handler) {
        throw new Error('Realtime event handler is not subscribed.');
      }
      await handler(payload, undefined as never);
    },
  };
};

const createStoreProductPayload = () => ({
  createdAt: '2026-08-08T12:00:00.000Z',
  offers: [],
  productUuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
  productSnapshot: {
    productUuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
    sourceVersion: 5,
    name: 'Product',
    status: 'active',
    syncedAt: '2026-08-08T12:00:00.000Z',
  },
  shopUuid: '1d932a09-5015-4688-a50e-03822fdeb37c',
  shopSnapshot: {
    shopUuid: '1d932a09-5015-4688-a50e-03822fdeb37c',
    sourceVersion: 2,
    name: 'Shop',
    syncedAt: '2026-08-08T12:00:00.000Z',
  },
  showing: true,
  status: 'active',
  updatedAt: '2026-08-08T12:00:00.000Z',
  uuid: '5b7e713c-f6c6-4450-b1dc-767a7458bf55',
  version: 8,
});
