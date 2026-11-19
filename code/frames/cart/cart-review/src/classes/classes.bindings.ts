import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CartReviewController } from './controller/cart-review/cart-review.controller.ts';
import { CartReviewControllerInterface } from './controller/cart-review/cart-review-controller.interface.ts';

export class CartReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CartReviewControllerInterface).to(CartReviewController);
  }
}
