import { CategoryEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const CategoryPresenterSymbol = Symbol.for('CategoryPresenter');

@injectable()
export class CategoryPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
  ) {}

  async update(category: CategoryEntity) {
    await this.formStore.update(category);
  }

  async create(category: CategoryEntity) {
    await this.formStore.create(category);
  }

  getCategoryData() {
    return this.categoryStore.data;
  }

  getAllCategoriesData() {
    return this.categoryStore.categories;
  }

  getCategoryInProcess() {
    return this.categoryStore.inProcess;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }

  async getData(uuid?: string) {
    return await this.categoryStore.getData(uuid);
  }
}
