import { CategoryService, CategoryServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const FindAllCategoryUseCaseSymbol = Symbol.for('FindAllCategoryUseCase');

@injectable()
export class FindAllCategoryUseCase {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
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
