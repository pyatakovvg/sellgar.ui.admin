import { CategoryServiceInterface, type CategoryEntity } from '@library/domain';
import { Controller, Inject } from '@sellgar/app-v2';

import { CategoryListControllerInterface } from './category-list-controller.interface.ts';
@Controller()
export class CategoryListController implements CategoryListControllerInterface {
  constructor(@Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {}

  async loader(): Promise<CategoryEntity[]> {
    const result = await this.categoryService.findAll();

    return result.data;
  }
}
