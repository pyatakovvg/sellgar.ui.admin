import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { BrandModifyControllerInterface } from './controller/brand-modify/brand-modify-controller.interface.ts';
import { BrandModifyController } from './controller/brand-modify/brand-modify.controller.ts';

export class BrandModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandModifyControllerInterface).to(BrandModifyController);
  }
}
