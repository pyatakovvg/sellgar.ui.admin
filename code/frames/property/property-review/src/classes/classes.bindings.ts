import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { PropertyReviewControllerInterface } from './controller/property-review/property-review-controller.interface.ts';
import { PropertyReviewController } from './controller/property-review/property-review.controller.ts';

export class PropertyReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyReviewControllerInterface).to(PropertyReviewController);
  }
}
