import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { BrandControllerInterface } from './controller/brand/brand-controller.interface.ts';
import { BrandController } from './controller/brand/brand.controller.ts';

export class BrandBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandControllerInterface).to(BrandController);
  }
}
