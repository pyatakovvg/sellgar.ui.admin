import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { BrandReviewControllerInterface } from './controller/brand-review/brand-review-controller.interface.ts';
import { BrandReviewController } from './controller/brand-review/brand-review.controller.ts';

export class BrandReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandReviewControllerInterface).to(BrandReviewController);
  }
}
