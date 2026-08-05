import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

export class CategoriesBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryControllerInterface).to(CategoryController);
  }
}
