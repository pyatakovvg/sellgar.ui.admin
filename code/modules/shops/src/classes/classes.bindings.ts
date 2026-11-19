import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ShopController } from './controller/shop/shop.controller.ts';
import { ShopControllerInterface } from './controller/shop/shop-controller.interface.ts';
import { SearchController } from './controller/search/search.controller.ts';
import { SearchControllerInterface } from './controller/search/search-controller.interface.ts';

export class ShopsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopControllerInterface).to(ShopController);
    registry.bind(SearchControllerInterface).to(SearchController);
  }
}
