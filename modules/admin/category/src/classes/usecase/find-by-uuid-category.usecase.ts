import { CategoryService, CategoryServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const FindByUuidCategoryUseCaseSymbol = Symbol.for('FindByUuidCategoryUseCase');

@injectable()
export class FindByUuidCategoryUseCase {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
  ) {}

  async execute(uuid: string) {
    this.categoryStore.setProcess(true);

    try {
      const result = await this.categoryService.findByUuid(uuid);

      this.categoryStore.setData(result);
    } finally {
      this.categoryStore.setProcess(false);
    }
  }
}
