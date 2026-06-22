import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { ProductController } from './controller/product.controller.ts';
import { ProductControllerInterface } from './controller/product-controller.interface.ts';

export class ProductModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FormStoreInterface).to(FormStore);
    registry.bind(ProductControllerInterface).to(ProductController);
  }
}
