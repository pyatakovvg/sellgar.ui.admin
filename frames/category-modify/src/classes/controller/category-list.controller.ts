import { CategoryEntity, CategoryServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { CategoryListControllerInterface } from './category-list-controller.interface.ts';
import { CategoryModifyFrameParams } from '../params';

@Controller()
export class CategoryListController implements CategoryListControllerInterface {
  constructor(@Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<CategoryModifyFrameParams>): Promise<CategoryEntity[]> {
    const result = await this.categoryService.findAll();

    return result.data;
  }
}
