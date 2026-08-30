import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { BrandCreateControllerInterface } from './controller/brand-create/brand-create-controller.interface.ts';
import { BrandCreateController } from './controller/brand-create/brand-create.controller.ts';

export class BrandCreateBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandCreateControllerInterface).to(BrandCreateController);
  }
}
