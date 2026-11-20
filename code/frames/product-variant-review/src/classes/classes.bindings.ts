import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { VariantReviewController } from './controller/variant-review/variant-review.controller.ts';
import { VariantReviewControllerInterface } from './controller/variant-review/variant-review-controller.interface.ts';

export class VariantReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(VariantReviewControllerInterface).to(VariantReviewController);
  }
}
