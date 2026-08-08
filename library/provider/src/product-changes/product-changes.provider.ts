import { ProductEntity, ProductServiceInterface } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import {
  Inject,
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
    @Inject(ProductServiceInterface)
    private readonly products: ProductServiceInterface,
  ) {}

  setup(): RuntimeProviderResult {
    return this.hub.subscribe({
      updated: async (productUuid, expectedVersion) => {
        const product = await this.products.findByUuid(productUuid);

        if (product.version < expectedVersion) {
          throw new Error(
            `Product ${productUuid} version ${product.version} is behind realtime version ${expectedVersion}`,
          );
        }

        updateEntity(ProductEntity, product);
      },
    });
  }
}
