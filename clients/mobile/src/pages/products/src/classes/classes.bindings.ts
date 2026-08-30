import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { ProductsControllerInterface } from './controller/products/products-controller.interface.ts';
import { ProductsController } from './controller/products/products.controller.ts';
import { ProductsFilterControllerInterface } from './controller/products-filter/products-filter-controller.interface.ts';
import { ProductsFilterController } from './controller/products-filter/products-filter.controller.ts';

export class ProductsBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductsControllerInterface).to(ProductsController);
    registry.bind(ProductsFilterControllerInterface).to(ProductsFilterController);
  }
}
