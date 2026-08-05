import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ShopModifyController } from './controller/shop-modify.controller.ts';
import { ShopModifyControllerInterface } from './controller/shop-modify-controller.interface.ts';

export class ShopModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopModifyControllerInterface).to(ShopModifyController);
  }
}
