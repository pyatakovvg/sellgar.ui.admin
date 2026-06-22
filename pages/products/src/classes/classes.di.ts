import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { ProductsController } from './controller/products.controller.ts';
import { ProductsControllerInterface } from './controller/products-controller.interface.ts';

export class ProductsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductsControllerInterface).to(ProductsController);
  }
}
