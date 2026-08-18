import { ProductEntity } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import {
  Inject,
  insertEntity,
  type RuntimeProviderResult,
  SingletonProvider,
  type SingletonProviderInterface,
  updateEntity,
  UseBindings,
} from '@sellgar/app';

import { ProductChangesBindings } from './classes/classes.bindings.ts';
import { ProductChangesHubInterface } from './classes/hub/product-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, ProductChangesBindings)
@SingletonProvider()
export class ProductChangesProvider implements SingletonProviderInterface {
  constructor(
    @Inject(ProductChangesHubInterface)
    private readonly hub: ProductChangesHubInterface,
  ) {}

  setup(): RuntimeProviderResult {
    return this.hub.subscribe({
      created: async (payload) => {
        insertEntity(ProductEntity, payload, { position: 'start' });
      },
      updated: async (payload) => {
        updateEntity(ProductEntity, payload);
      },
    });
  }
}
