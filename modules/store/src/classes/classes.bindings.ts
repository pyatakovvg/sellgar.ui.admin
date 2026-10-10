import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { FilterControllerInterface } from './controller/filter/filter-controller.interface.ts';
import { FilterController } from './controller/filter/filter.controller.ts';
import { StoreControllerInterface } from './controller/store/store-controller.interface.ts';
import { StoreController } from './controller/store/store.controller.ts';

export class StoreBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FilterControllerInterface).to(FilterController);
    registry.bind(StoreControllerInterface).to(StoreController);
  }
}
