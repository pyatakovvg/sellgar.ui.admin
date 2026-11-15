import { AuthServiceInterface, ConfigInterface, CategoryEntity } from '@library/domain';
import { SocketIOConnectionsInterface, type SocketIOConnectionInterface } from '@library/socket-io';
import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CategoryChangesHubInterface, type CategoryChangesListener } from './category-changes-hub.interface.ts';

@Injectable()
export class CategoryChangesHub implements CategoryChangesHubInterface {
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
      path: '/socket.io/categories',
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  subscribe(listener: CategoryChangesListener): () => Promise<void> {
    const subscriptions = ['store.category.created', 'store.category.updated'].map((eventType) =>
      this.connection.subscribeDelivery(eventType, async (value: unknown) => {
        const payload = plainToInstance(CategoryEntity, value, { excludeExtraneousValues: true });
        await validateOrReject(payload);
        await listener.changed(payload);
      }),
    );
    return async () => {
      await Promise.all(subscriptions.map((subscription) => subscription.dispose()));
    };
  }
}
