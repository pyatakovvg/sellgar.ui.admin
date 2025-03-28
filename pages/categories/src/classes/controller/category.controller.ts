import { CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStoreInterface } from '../store/category-store.interface.ts';
import { CategoryControllerInterface } from './category-controller.interface.ts';

@injectable()
export class CategoryController implements CategoryControllerInterface {
  constructor(
    @inject(CategoryStoreInterface) private readonly categoryStore: CategoryStoreInterface,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  getData() {
    return this.categoryStore.data;
  }

  getMeta() {
    return this.categoryStore.meta;
  }

  async findAll() {
    try {
      const result = await this.categoryService.findAll();

      this.categoryStore.setData(result.data);
      this.categoryStore.setMeta(result.meta);

      return result;
    } finally {
    }
  }
}
