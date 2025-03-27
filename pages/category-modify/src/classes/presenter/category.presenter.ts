import { CategoryEntity, CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';
import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';

export const CategoryPresenterSymbol = Symbol.for('CategoryPresenter');

@injectable()
export class CategoryPresenter {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  async findByUuid(uuid: string) {
    try {
      const result = await this.categoryService.findByUuid(uuid);

      this.categoryStore.setData(result);

      return result;
    } catch (error) {
      if (error instanceof Array) {
        this.categoryStore.setValidationError(error);
      }
    }
  }

  async findAll() {
    try {
      const result = await this.categoryService.findAll();

      this.categoryStore.setCategories(result);
    } catch (error) {
      if (error instanceof Array) {
        this.categoryStore.setValidationError(error);
      }
    }
  }

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
    return false;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }
}
