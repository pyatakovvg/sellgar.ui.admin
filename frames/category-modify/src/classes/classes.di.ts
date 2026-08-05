import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryListController } from './controller/category-list.controller.ts';
import { CategoryListControllerInterface } from './controller/category-list-controller.interface.ts';
import { CategoryModifyController } from './controller/category-modify.controller.ts';
import { CategoryModifyControllerInterface } from './controller/category-modify-controller.interface.ts';

export class CategoryModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryModifyControllerInterface).to(CategoryModifyController);
    registry.bind(CategoryListControllerInterface).to(CategoryListController);
  }
}
