import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProductChangesHubInterface } from './hub/product-changes-hub.interface.ts';
import { ProductChangesHub } from './hub/product-changes.hub.ts';

export class ProductChangesBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductChangesHubInterface).to(ProductChangesHub).inSingletonScope();
  }
}
