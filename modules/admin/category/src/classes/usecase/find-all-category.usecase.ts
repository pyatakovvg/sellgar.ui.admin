import { CategoryService, CategoryServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoriesStore, CategoriesStoreSymbol } from '../store/categories.store.ts';

export const FindAllCategoryUseCaseSymbol = Symbol.for('FindAllCategoryUseCase');

@injectable()
export class FindAllCategoryUseCase {
  constructor(
    @inject(CategoriesStoreSymbol) private readonly categoriesStore: CategoriesStore,
    @inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
  ) {}

  async execute() {
    this.categoriesStore.setProcess(true);

    try {
      const result = await this.categoryService.findAll();

      this.categoriesStore.setData(result.data);
    } finally {
      this.categoriesStore.setProcess(false);
    }
  }
}
