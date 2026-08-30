import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { BrandsControllerInterface } from './controller/brands/brands-controller.interface.ts';
import { BrandsController } from './controller/brands/brands.controller.ts';

export class BrandsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandsControllerInterface).to(BrandsController);
  }
}
