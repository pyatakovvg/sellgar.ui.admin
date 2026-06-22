import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { BrandController } from './controller/brand.controller.ts';
import { BrandsControllerInterface } from './controller/brand-controller.interface.ts';

export class BrandsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandsControllerInterface).to(BrandController);
  }
}
