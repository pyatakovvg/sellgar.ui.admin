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
    const created = this.connection.subscribeDelivery('store.product.created', async (value) => {
      await this.deliver(value, listener.created);
    });
    const updated = this.connection.subscribeDelivery('store.product.updated', async (value) => {
      await this.deliver(value, listener.updated);
    });

    return async () => {
      await Promise.all([created.dispose(), updated.dispose()]);
    };
  }

  private async deliver(value: unknown, listener: StoreOfferChangesListener['updated']): Promise<void> {
    const payload = plainToInstance(StoreProductEntity, value);

    await validateOrReject(payload);
    await listener(payload);
  }
}
