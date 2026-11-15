import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryModifyControllerInterface } from './controller/category-modify/category-modify-controller.interface.ts';
import { CategoryModifyController } from './controller/category-modify/category-modify.controller.ts';

export class CategoryModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryModifyControllerInterface).to(CategoryModifyController);
  }
}
