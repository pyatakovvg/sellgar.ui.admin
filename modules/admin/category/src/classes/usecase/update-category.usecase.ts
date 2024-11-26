import { CategoryEntity, CategoryService, CategoryServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const UpdateCategoryUseCaseSymbol = Symbol.for('UpdateCategoryUseCase');

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
  ) {}

  async execute(uuid: string, category: CategoryEntity) {
    // this.categoriesStore.setProcess(true);

    try {
      const result = await this.categoryService.update(uuid, {
        uuid: category.uuid,
        name: category.name,
        description: category.description,
        parentUuid: category.parentUuid,
      });

      this.categoryStore.setData(result.data);
    } finally {
      // this.categoriesStore.setProcess(false);
    }
  }
}
