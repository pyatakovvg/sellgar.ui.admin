import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryListControllerInterface } from './controller/category-list/category-list-controller.interface.ts';
import { CategoryListController } from './controller/category-list/category-list.controller.ts';
import { CategoryModifyControllerInterface } from './controller/category-modify/category-modify-controller.interface.ts';
import { CategoryModifyController } from './controller/category-modify/category-modify.controller.ts';

export class CategoryModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryModifyControllerInterface).to(CategoryModifyController);
    registry.bind(CategoryListControllerInterface).to(CategoryListController);
  }
}
