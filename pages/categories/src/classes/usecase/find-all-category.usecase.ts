import { CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const FindAllCategoryUseCaseSymbol = Symbol.for('FindAllCategoryUseCase');

@injectable()
export class FindAllCategoryUseCase {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  async execute() {
    this.categoryStore.setProcess(true);

    try {
      const result = await this.categoryService.findAll();

      this.categoryStore.setData(result.data);
      this.categoryStore.setMeta(result.meta);
    } finally {
      this.categoryStore.setProcess(false);
    }
  }
}
