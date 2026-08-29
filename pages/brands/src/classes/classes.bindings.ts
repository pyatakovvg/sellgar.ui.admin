import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { BrandControllerInterface } from './controller/brand/brand-controller.interface.ts';
import { BrandController } from './controller/brand/brand.controller.ts';
import { FilterControllerInterface } from './controller/filter/filter-controller.interface.ts';
import { FilterController } from './controller/filter/filter.controller.ts';

export class BrandsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandControllerInterface).to(BrandController);
    registry.bind(FilterControllerInterface).to(FilterController);
  }
}
