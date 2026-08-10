import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProductControllerInterface } from './controller/product/product-controller.interface.ts';
import { ProductController } from './controller/product/product.controller.ts';

export class ProductsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductControllerInterface).to(ProductController);
  }
}
