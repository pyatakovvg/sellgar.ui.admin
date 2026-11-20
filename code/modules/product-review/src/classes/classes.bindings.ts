import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { ProductReviewController } from './controller/product-review/product-review.controller.ts';
import { ProductReviewControllerInterface } from './controller/product-review/product-review-controller.interface.ts';

export class ProductReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductReviewControllerInterface).to(ProductReviewController);
  }
}
