import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { BrandModifyController } from './controller/brand-modify.controller.ts';
import { BrandModifyControllerInterface } from './controller/brand-modify-controller.interface.ts';

export class BrandModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandModifyControllerInterface).to(BrandModifyController);
  }
}
