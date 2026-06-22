import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { ShopController } from './controller/shop.controller.ts';
import { ShopControllerInterface } from './controller/shop-controller.interface.ts';

export class ShopBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopControllerInterface).to(ShopController);
  }
}
