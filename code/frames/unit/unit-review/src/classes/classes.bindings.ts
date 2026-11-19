import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { UnitReviewControllerInterface } from './controller/unit-review/unit-review-controller.interface.ts';
import { UnitReviewController } from './controller/unit-review/unit-review.controller.ts';

export class UnitReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitReviewControllerInterface).to(UnitReviewController);
  }
}
