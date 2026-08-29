import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { ShopModifyControllerInterface } from './controller/shop-modify/shop-modify-controller.interface.ts';
import { ShopModifyController } from './controller/shop-modify/shop-modify.controller.ts';

export class ShopModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopModifyControllerInterface).to(ShopModifyController);
  }
}
