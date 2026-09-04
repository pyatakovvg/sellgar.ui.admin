import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { BrandOptionsControllerInterface } from './controller/brand-options/brand-options-controller.interface.ts';
import { BrandOptionsController } from './controller/brand-options/brand-options.controller.ts';
import { CategoryOptionsControllerInterface } from './controller/category-options/category-options-controller.interface.ts';
import { CategoryOptionsController } from './controller/category-options/category-options.controller.ts';
import { ProductControllerInterface } from './controller/product/product-controller.interface.ts';
import { ProductController } from './controller/product/product.controller.ts';
import { PropertyOptionsControllerInterface } from './controller/property-options/property-options-controller.interface.ts';
import { PropertyOptionsController } from './controller/property-options/property-options.controller.ts';

export class ProductModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandOptionsControllerInterface).to(BrandOptionsController);
    registry.bind(CategoryOptionsControllerInterface).to(CategoryOptionsController);
    registry.bind(ProductControllerInterface).to(ProductController);
    registry.bind(PropertyOptionsControllerInterface).to(PropertyOptionsController);
  }
}
