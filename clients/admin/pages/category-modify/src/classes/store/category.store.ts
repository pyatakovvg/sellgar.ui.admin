import { HttpException, CategoryEntity, CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const CategoryStoreSymbol = Symbol.for('CategoryStore');

@injectable()
export class CategoryStore {
  @observable inProcess: boolean = true;
  @observable data: CategoryEntity;
  @observable error: HttpException | null = null;
  @observable categories: CategoryEntity[] = [];

  constructor(@inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: CategoryEntity) {
    this.data = data;
  }

  @action.bound
  setCategories(data: CategoryEntity[]) {
    this.categories = data;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  filterCategoryByUuid(data: CategoryEntity[], uuid?: string) {
    if (!uuid) {
      return data;
    }
    return data.reduce((acc, category) => {
      if (category.uuid === uuid) {
        return acc;
      }
      const filteredChildren = this.filterCategoryByUuid(category.children, uuid);
      acc.push({
        ...category,
        children: filteredChildren,
      });
      return acc;
    }, [] as CategoryEntity[]);
  }

  @action.bound
  async getData(uuid?: string) {
    this.setProcess(true);

    try {
      if (uuid) {
        const category = await this.categoryService.findByUuid(uuid);

        this.setData(category);
      }

      const categories = await this.categoryService.findAll();
      const filteredCategories = this.filterCategoryByUuid(categories.data, uuid);

      this.setCategories(filteredCategories);
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }
}
