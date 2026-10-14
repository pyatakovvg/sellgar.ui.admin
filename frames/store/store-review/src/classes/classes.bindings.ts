import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { StoreReviewControllerInterface } from './controller/store-review/store-review-controller.interface.ts';
import { StoreReviewController } from './controller/store-review/store-review.controller.ts';
export class StoreReviewBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreReviewControllerInterface).to(StoreReviewController);
  }
}
