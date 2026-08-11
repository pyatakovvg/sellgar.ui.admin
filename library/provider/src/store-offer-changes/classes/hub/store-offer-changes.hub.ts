import { AuthServiceInterface, ConfigInterface, StoreProductEntity } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { StoreOfferChangesHubInterface, type StoreOfferChangesListener } from './store-offer-changes-hub.interface.ts';

@Injectable()
export class StoreOfferChangesHub implements StoreOfferChangesHubInterface {
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
      path: '/socket.io/store',
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  subscribe(listener: StoreOfferChangesListener): () => Promise<void> {
    const subscription = this.connection.subscribeDelivery('store.product.updated', async (value: unknown) => {
      const payload: StoreProductEntity = plainToInstance(StoreProductEntity, value);

      await validateOrReject(payload);
      await listener.updated(payload);
    });

    return () => subscription.dispose();
  }
}
