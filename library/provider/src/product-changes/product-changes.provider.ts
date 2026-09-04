import { ProductEntity } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import {
  Inject,
  insertEntity,
  Provider,
  type ProviderInterface,
  type ProviderResult,
  updateEntity,
  UseBindings,
} from '@sellgar/app';

import { ProductChangesBindings } from './classes/classes.bindings.ts';
import { ProductChangesHubInterface } from './classes/hub/product-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, ProductChangesBindings)
@Provider({ lifetime: 'application' })
export class ProductChangesProvider implements ProviderInterface {
  constructor(
    @Inject(ProductChangesHubInterface)
    private readonly hub: ProductChangesHubInterface,
  ) {}

  activate(): ProviderResult {
    return this.hub.subscribe({
      created: async (payload) => {
        insertEntity(ProductEntity, payload, { position: 'start' });
      },
      updated: async (payload) => {
        updateEntity(ProductEntity, payload);
      },
    });
  }

  dispose(): void {}
}
