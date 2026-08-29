import { ProductEntity, type AuthServiceInterface, type ConfigInterface } from '@library/domain';
import {
  type SocketIOConnectionInterface,
  type SocketIOConnectionOptions,
  type SocketIODeliverySubscription,
  type SocketIOConnectionsInterface,
  type SocketIORealtimeDeliveryHandler,
} from '@library/socket-io';
import type { LocationServiceInterface, LocationServiceListener, RouterLocationSnapshot } from '@sellgar/app-v2';

import { ProductChangesHub } from '../product-changes.hub.ts';

describe('ProductChangesHub', () => {
  it('gets a short-lived ticket and opens the products transport lazily', async () => {
    const fixture = createFixture();

    new ProductChangesHub(fixture.config, fixture.auth, fixture.connections, fixture.locationService);

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

    new ProductChangesHub(fixture.config, fixture.auth, fixture.connections, fixture.locationService);

    const auth = fixture.connections.get.mock.calls[0]?.[1]?.auth;
    const callback = vi.fn();

    if (typeof auth === 'function') {
      auth(callback);
    }

    await vi.waitFor(() => expect(callback).toHaveBeenCalledWith({}));
  });

  it('subscribes to product events and passes validated product payloads to their listeners', async () => {
    const fixture = createFixture();
    const hub = new ProductChangesHub(fixture.config, fixture.auth, fixture.connections, fixture.locationService);
    const listener = {
      created: vi.fn(async () => undefined),
      updated: vi.fn(async () => undefined),
    };

    hub.subscribe(listener);
    await fixture.emit('product.created', createProductPayload());
    await fixture.emit('product.updated', createProductPayload());

    expect(fixture.connection.subscribeDelivery).toHaveBeenCalledWith('product.created', expect.any(Function));
    expect(fixture.connection.subscribeDelivery).toHaveBeenCalledWith('product.updated', expect.any(Function));
    expect(listener.created).toHaveBeenCalledWith(expect.any(ProductEntity));
    expect(listener.updated).toHaveBeenCalledWith(expect.any(ProductEntity));
    expect(listener.updated).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Product',
        uuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
        version: 5,
      }),
    );
  });

  it('rejects an invalid product payload', async () => {
    const fixture = createFixture();
    const hub = new ProductChangesHub(fixture.config, fixture.auth, fixture.connections, fixture.locationService);
    const listener = {
      created: vi.fn(async () => undefined),
      updated: vi.fn(async () => undefined),
    };

    hub.subscribe(listener);

    await expect(fixture.emit('product.updated', { uuid: 'not-a-uuid' })).rejects.toBeDefined();

    expect(listener.updated).not.toHaveBeenCalled();
  });

  it('synchronizes the current route only with the product.created subscription', async () => {
    const fixture = createFixture();
    const hub = new ProductChangesHub(fixture.config, fixture.auth, fixture.connections, fixture.locationService);
    const listener = {
      created: vi.fn(async () => undefined),
      updated: vi.fn(async () => undefined),
    };

    const dispose = hub.subscribe(listener);
    const createdSubscription = fixture.subscription('product.created');
    const updatedSubscription = fixture.subscription('product.updated');

    expect(createdSubscription.updateContext).toHaveBeenCalledOnce();
    expect(createdSubscription.updateContext).toHaveBeenLastCalledWith({
      pathname: '/products',
      search: '?status=active',
    });
    expect(updatedSubscription.updateContext).not.toHaveBeenCalled();

    fixture.changeLocation('/products', '?status=archived');

    expect(createdSubscription.updateContext).toHaveBeenCalledTimes(2);
    expect(createdSubscription.updateContext).toHaveBeenLastCalledWith({
      pathname: '/products',
      search: '?status=archived',
    });

    fixture.changeLocation('/products', '?status=archived');

    expect(createdSubscription.updateContext).toHaveBeenCalledTimes(2);

    await dispose();

    expect(fixture.unsubscribeLocation).toHaveBeenCalledOnce();
    expect(createdSubscription.dispose).toHaveBeenCalledOnce();
    expect(updatedSubscription.dispose).toHaveBeenCalledOnce();
  });
});

const createFixture = () => {
  const handlers = new Map<string, SocketIORealtimeDeliveryHandler>();
  const subscriptions = new Map<string, TestDeliverySubscription>();
  let location = createLocation('/products', '?status=active');
  window.history.replaceState({}, '', '/products?status=active');
  let locationListener: LocationServiceListener | undefined;
  const unsubscribeLocation = vi.fn();
  const connection = {
    subscribeDelivery: vi.fn((eventType: string, subscribedHandler: SocketIORealtimeDeliveryHandler) => {
      const subscription: TestDeliverySubscription = {
        dispose: vi.fn(async () => undefined),
        updateContext: vi.fn(),
      };

      handlers.set(eventType, subscribedHandler);
      subscriptions.set(eventType, subscription);

      return subscription;
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
  const locationService = {
    get location() {
      return location;
    },
    subscribe: vi.fn((listener: LocationServiceListener) => {
      locationListener = listener;

      return unsubscribeLocation;
    }),
  } as unknown as LocationServiceInterface;

  return {
    auth,
    changeLocation(pathname: string, search: string) {
      window.history.replaceState({}, '', pathname + search);
      location = createLocation(pathname, search);
      locationListener?.(location);
    },
    config,
    connection,
    connections,
    async emit(eventType: string, payload: unknown) {
      const handler = handlers.get(eventType);

      if (!handler) {
        throw new Error(`Realtime event handler is not subscribed: ${eventType}.`);
      }

      await handler(payload, undefined as never);
    },
    locationService,
    subscription(eventType: string): TestDeliverySubscription {
      const subscription = subscriptions.get(eventType);

      if (!subscription) {
        throw new Error(`Realtime delivery subscription was not created: ${eventType}.`);
      }

      return subscription;
    },
    unsubscribeLocation,
  };
};

type TestDeliverySubscription = SocketIODeliverySubscription & {
  dispose: ReturnType<typeof vi.fn>;
  updateContext: ReturnType<typeof vi.fn>;
};

const createLocation = (_pathname: string, search: string): RouterLocationSnapshot => ({
  params: {},
  query: Object.fromEntries(new URLSearchParams(search)),
  state: undefined,
});

const createProductPayload = () => ({
  brand: {
    code: 'brand',
    createdAt: '2026-08-08T12:00:00.000Z',
    description: 'Brand description',
    name: 'Brand',
    updatedAt: '2026-08-08T12:00:00.000Z',
    uuid: '35f44766-20e9-44be-a3f3-dbeacbe49bf7',
    version: 1,
  },
  brandUuid: '35f44766-20e9-44be-a3f3-dbeacbe49bf7',
  category: {
    code: 'category',
    createdAt: '2026-08-08T12:00:00.000Z',
    description: 'Category description',
    name: 'Category',
    updatedAt: '2026-08-08T12:00:00.000Z',
    uuid: 'f334ff3d-e8f7-4080-b8f0-35e66c4d876e',
    version: 1,
  },
  categoryUuid: 'f334ff3d-e8f7-4080-b8f0-35e66c4d876e',
  createdAt: '2026-08-08T12:00:00.000Z',
  description: 'Product description',
  name: 'Product',
  properties: [],
  status: 'active',
  updatedAt: '2026-08-08T12:00:00.000Z',
  uuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
  variants: [],
  version: 5,
});
