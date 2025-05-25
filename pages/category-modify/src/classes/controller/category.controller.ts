import { CategoryServiceInterface, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { CategoryControllerInterface } from './category-controller.interface.ts';

@injectable()
export class CategoryController implements CategoryControllerInterface {
  constructor(
    @inject(FormStoreInterface) public readonly formStore: FormStoreInterface,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  async findAll() {
    const result = await this.categoryService.findAll();

    this.formStore.setCategories(result.data);
  }

  async findByUuid(uuid: string) {
    return await this.categoryService.findByUuid(uuid);
  }

  async update(uuid: string, data: UpdateCategoryDto) {
    this.formStore.setProcess(true);

    try {
      return await this.categoryService.update(uuid, data);
    } catch (error) {
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }

  async create(data: CreateCategoryDto) {
    this.formStore.setProcess(true);

    try {
      return await this.categoryService.create(data);
    } catch (error) {
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }
}
