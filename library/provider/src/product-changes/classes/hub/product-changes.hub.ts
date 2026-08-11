import { AuthServiceInterface, ConfigInterface, ProductEntity } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ProductChangesHubInterface, type ProductChangesListener } from './product-changes-hub.interface.ts';

@Injectable()
export class ProductChangesHub implements ProductChangesHubInterface {
  private readonly connection: SocketIOConnectionInterface;

  constructor(
    @Inject(ConfigInterface) config: ConfigInterface,
    @Inject(AuthServiceInterface) auth: AuthServiceInterface,
    @Inject(SocketIOConnectionsInterface) connections: SocketIOConnectionsInterface,
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
    const subscription = this.connection.subscribeDelivery('product.updated', async (value: unknown) => {
      const payload: ProductEntity = plainToInstance(ProductEntity, value);

      await validateOrReject(payload);
      await listener.updated(payload);
    });

    return () => subscription.dispose();
  }
}
