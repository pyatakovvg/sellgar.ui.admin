import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryChangesHubInterface } from './hub/category-changes-hub.interface.ts';
import { CategoryChangesHub } from './hub/category-changes.hub.ts';

export class CategoryChangesBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryChangesHubInterface).to(CategoryChangesHub).inSingletonScope();
  }
}
