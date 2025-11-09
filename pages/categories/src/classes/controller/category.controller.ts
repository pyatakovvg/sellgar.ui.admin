import { CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryControllerInterface } from './category-controller.interface.ts';

@injectable()
export class CategoryController implements CategoryControllerInterface {
  constructor(@inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {}

  async findAll() {
    return await this.categoryService.findAll();
  }
}
