import { CategoryServiceInterface } from '@library/domain';

import { Controller, Inject } from '@sellgar/app';

import { CategoryControllerInterface } from './category-controller.interface.ts';

@Controller()
export class CategoryController implements CategoryControllerInterface {
  constructor(@Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {}

  async loader() {
    return await this.categoryService.findAll();
  }
}
