import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

export class CategoryModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FormStoreInterface).to(FormStore);
    registry.bind(CategoryControllerInterface).to(CategoryController);
  }
}
