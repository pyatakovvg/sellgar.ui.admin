import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ShopControllerInterface } from './controller/shop/shop-controller.interface.ts';
import { ShopController } from './controller/shop/shop.controller.ts';

export class ShopsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopControllerInterface).to(ShopController);
  }
}
