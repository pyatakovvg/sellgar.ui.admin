import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';
import { FindAllCategoryUseCase, FindAllCategoryUseCaseSymbol } from '../usecase/find-all-category.usecase.ts';

export const CategoryPresenterSymbol = Symbol.for('CategoryPresenter');

@injectable()
export class CategoryPresenter {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(FindAllCategoryUseCaseSymbol) private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
  ) {}

  getData() {
    return this.categoryStore.data;
  }

  getMeta() {
    return this.categoryStore.meta;
  }

  getInProcess() {
    return this.categoryStore.inProcess;
  }

  async findAll() {
    return await this.findAllCategoryUseCase.execute();
  }
}
