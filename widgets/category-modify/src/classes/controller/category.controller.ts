import { CategoryEntity, CategoryServiceInterface, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { CategoryControllerInterface } from './category-controller.interface.ts';

@injectable()
export class CategoryController implements CategoryControllerInterface {
  constructor(
    @inject(FormStoreInterface) public readonly formStore: FormStoreInterface,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  async findByUuid(uuid?: string) {
    const result = await this.categoryService.findAll();

    this.formStore.setCategories(result.data);

    if (uuid) {
      return await this.categoryService.findByUuid(uuid);
    }
    return new CategoryEntity();
  }

  async update(uuid: string, data: UpdateCategoryDto) {
    return await this.categoryService.update(uuid, data);
  }

  async create(data: CreateCategoryDto) {
    return await this.categoryService.create(data);
  }
}
