import { AuthServiceInterface, ConfigInterface } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable } from '@sellgar/app';

import { StoreOfferChangesHubInterface } from './store-offer-changes-hub.interface.ts';
import type { StoreOfferChangesListener } from './store-offer-changes-listener.interface.ts';
import { parseStoreProductUpdatedPayload } from './store-product-updated.payload.ts';

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
      const payload = parseStoreProductUpdatedPayload(value);
      await listener.updated(payload.storeProductUuid, payload.version);
    });

    return () => subscription.dispose();
  }
}
