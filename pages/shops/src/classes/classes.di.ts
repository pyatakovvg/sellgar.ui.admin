import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ShopsController } from './controller/shops.controller.ts';
import { ShopsControllerInterface } from './controller/shops-controller.interface.ts';

export class ShopsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopsControllerInterface).to(ShopsController);
  }
}
