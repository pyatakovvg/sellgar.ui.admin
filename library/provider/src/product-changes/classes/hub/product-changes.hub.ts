import { AuthServiceInterface, ConfigInterface } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable } from '@sellgar/app';

import { ProductChangesHubInterface } from './product-changes-hub.interface.ts';
import type { ProductChangesListener } from './product-changes-listener.interface.ts';
import { parseProductUpdatedPayload } from './product-updated.payload.ts';

@Injectable()
export class ProductChangesHub implements ProductChangesHubInterface {
  private readonly connection: SocketIOConnectionInterface;

  constructor(
    @Inject(ConfigInterface) config: ConfigInterface,
    @Inject(AuthServiceInterface) auth: AuthServiceInterface,
    @Inject(SocketIOConnectionsInterface) connections: SocketIOConnectionsInterface,
  ) {
    this.connection = connections.get(new URL('/realtime', config.get('SOCKET_GATEWAY_API')).toString(), {
      auth: (callback) => {
        void auth
          .issueSocketTicket()
          .then(({ ticket }) => callback({ ticket }))
          .catch(() => callback({ ticket: '' }));
      },
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  subscribe(listener: ProductChangesListener): () => Promise<void> {
    const subscription = this.connection.subscribeDelivery('product.updated', async (value: unknown) => {
      const payload = parseProductUpdatedPayload(value);

      await listener.updated(payload.productUuid, payload.version);
    });

    return () => subscription.dispose();
  }
}
