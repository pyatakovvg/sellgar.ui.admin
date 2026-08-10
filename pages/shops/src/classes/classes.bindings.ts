import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { FilterControllerInterface } from './controller/filter/filter-controller.interface.ts';
import { FilterController } from './controller/filter/filter.controller.ts';
import { ShopControllerInterface } from './controller/shop/shop-controller.interface.ts';
import { ShopController } from './controller/shop/shop.controller.ts';

export class ShopsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FilterControllerInterface).to(FilterController);
    registry.bind(ShopControllerInterface).to(ShopController);
  }
}
