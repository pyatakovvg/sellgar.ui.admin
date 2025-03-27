import { HttpException, CategoryEntity, CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';
import { ValidationError } from 'class-validator';

export const CategoryStoreSymbol = Symbol.for('CategoryStore');

@injectable()
export class CategoryStore {
  @observable data: CategoryEntity;
  @observable categories: CategoryEntity[] = [];
  @observable error: HttpException | null = null;
  @observable validationError: ValidationError[] = [];

  @action.bound
  setData(data: CategoryEntity) {
    this.data = data;
  }

  @action.bound
  setCategories(data: CategoryEntity[]) {
    this.categories = data;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  @action.bound
  setValidationError(errors: ValidationError[]) {
    this.validationError = errors;
  }

  // filterCategoryByUuid(data: CategoryEntity[], uuid?: string) {
  //   if (!uuid) {
  //     return data;
  //   }
  //   return data.reduce((acc, category) => {
  //     if (category.uuid === uuid) {
  //       return acc;
  //     }
  //     const filteredChildren = this.filterCategoryByUuid(category.children, uuid);
  //     acc.push({
  //       ...category,
  //       children: filteredChildren,
  //     });
  //     return acc;
  //   }, [] as CategoryEntity[]);
  // }

  // @action.bound
  // async getData(uuid?: string) {
  //   this.setProcess(true);
  //
  //   try {
  //     let category;
  //
  //     if (uuid) {
  //       category = await this.categoryService.findByUuid(uuid);
  //
  //       this.setData(category);
  //     }
  //
  //     const categories = await this.categoryService.findAll();
  //     const filteredCategories = this.filterCategoryByUuid(categories.data, uuid);
  //
  //     this.setCategories(filteredCategories);
  //
  //     return category;
  //   } catch (error) {
  //     this.setError(error as HttpException);
  //   } finally {
  //     this.setProcess(false);
  //   }
  // }
}
