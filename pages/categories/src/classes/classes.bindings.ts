import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { CategoryControllerInterface } from './controller/category/category-controller.interface.ts';
import { CategoryController } from './controller/category/category.controller.ts';

export class CategoriesBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryControllerInterface).to(CategoryController);
  }
}
