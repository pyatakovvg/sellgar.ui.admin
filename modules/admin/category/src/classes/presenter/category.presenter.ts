import { CategoryEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { CategoryStore, CategoryStoreSymbol } from '../store/category.store.ts';
import { CategoriesStore, CategoriesStoreSymbol } from '../store/categories.store.ts';
import { CreateCategoryUseCase, CreateCategoryUseCaseSymbol } from '../usecase/create-category.usecase.ts';
import { UpdateCategoryUseCase, UpdateCategoryUseCaseSymbol } from '../usecase/update-category.usecase.ts';
import { FindAllCategoryUseCase, FindAllCategoryUseCaseSymbol } from '../usecase/find-all-category.usecase.ts';
import {
  FindByUuidCategoryUseCase,
  FindByUuidCategoryUseCaseSymbol,
} from '../usecase/find-by-uuid-category.usecase.ts';

export const CategoryPresenterSymbol = Symbol.for('CategoryPresenter');

@injectable()
export class CategoryPresenter {
  constructor(
    @inject(CategoryStoreSymbol) private readonly categoryStore: CategoryStore,
    @inject(CategoriesStoreSymbol) private readonly categoriesStore: CategoriesStore,
    @inject(CreateCategoryUseCaseSymbol) private readonly createCategoryUseCase: CreateCategoryUseCase,
    @inject(UpdateCategoryUseCaseSymbol) private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    @inject(FindAllCategoryUseCaseSymbol) private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    @inject(FindByUuidCategoryUseCaseSymbol) private readonly findByUuidCategoryUseCase: FindByUuidCategoryUseCase,
  ) {}

  async update(uuid: string, category: CategoryEntity) {
    await this.updateCategoryUseCase.execute(uuid, category);
  }

  async create(category: CategoryEntity) {
    await this.createCategoryUseCase.execute(category);
  }

  getCategoryData() {
    return this.categoryStore.data;
  }

  getAllCategoriesData() {
    return this.categoriesStore.data;
  }

  getCategoryInProcess() {
    return this.categoryStore.inProcess;
  }

  getCategoriesInProcess() {
    return this.categoriesStore.inProcess;
  }

  async findAllCategories() {
    return await this.findAllCategoryUseCase.execute();
  }

  async findByUuidCategory(uuid: string) {
    return await this.findByUuidCategoryUseCase.execute(uuid);
  }
}
