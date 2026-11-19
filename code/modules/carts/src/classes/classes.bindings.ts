import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CartController } from './controller/cart/cart.controller.ts';
import { CartControllerInterface } from './controller/cart/cart-controller.interface.ts';

export class CartsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CartControllerInterface).to(CartController);
  }
}
