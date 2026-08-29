import { AuthServiceInterface, ConfigInterface, ProductEntity } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable, LocationServiceInterface, type RouterLocationSnapshot } from '@sellgar/app-v2';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ProductChangesHubInterface, type ProductChangesListener } from './product-changes-hub.interface.ts';

interface ProductCreatedSubscriptionContext {
  readonly pathname: string;
  readonly search: string;
}

@Injectable()
export class ProductChangesHub implements ProductChangesHubInterface {
  private readonly connection: SocketIOConnectionInterface;

  constructor(
    @Inject(ConfigInterface) config: ConfigInterface,
    @Inject(AuthServiceInterface) auth: AuthServiceInterface,
    @Inject(SocketIOConnectionsInterface) connections: SocketIOConnectionsInterface,
    @Inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {
    this.connection = connections.get(config.get('SOCKET_GATEWAY_API'), {
      addTrailingSlash: false,
      auth: (callback) => {
        void auth
          .issueSocketTicket()
          .then(({ ticket }) => callback({ ticket }))
          .catch(() => {
            // Завершаем auth callback без credentials: gateway отклонит handshake.
            callback({});
          });
      },
      forceNew: true,
      path: '/socket.io/products',
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  subscribe(listener: ProductChangesListener): () => Promise<void> {
    const createdSubscription = this.connection.subscribeDelivery<ProductEntity, ProductCreatedSubscriptionContext>(
      'product.created',
      (value: unknown) => this.deliver(value, listener.created),
    );
    const updatedSubscription = this.connection.subscribeDelivery<ProductEntity>('product.updated', (value: unknown) =>
      this.deliver(value, listener.updated),
    );
    let locationKey: string | undefined;
    const synchronizeLocation = (location: RouterLocationSnapshot | null): void => {
      if (!location) {
        return;
      }

      const { pathname, search } = window.location;
      const nextLocationKey = `${pathname}\u0000${search}`;

      if (nextLocationKey === locationKey) {
        return;
      }

      locationKey = nextLocationKey;
      createdSubscription.updateContext({
        pathname,
        search,
      });
    };

    synchronizeLocation(this.locationService.location);
    const unsubscribeLocation = this.locationService.subscribe(synchronizeLocation);

    return async () => {
      unsubscribeLocation();
      await Promise.all([createdSubscription.dispose(), updatedSubscription.dispose()]);
    };
  }

  private async deliver(value: unknown, listener: (payload: ProductEntity) => Promise<void>): Promise<void> {
    const payload: ProductEntity = plainToInstance(ProductEntity, value);

    await validateOrReject(payload);
    await listener(payload);
  }
}
