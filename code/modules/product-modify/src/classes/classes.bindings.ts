import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { BrandOptionsControllerInterface } from './controller/brand-options/brand-options-controller.interface.ts';
import { BrandOptionsController } from './controller/brand-options/brand-options.controller.ts';
import { ProductControllerInterface } from './controller/product/product-controller.interface.ts';
import { ProductController } from './controller/product/product.controller.ts';

export class ProductModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandOptionsControllerInterface).to(BrandOptionsController);
    registry.bind(ProductControllerInterface).to(ProductController);
  }
}
