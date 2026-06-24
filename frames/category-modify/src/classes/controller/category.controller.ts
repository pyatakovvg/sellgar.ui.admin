import { CategoryEntity, CategoryServiceInterface, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';
import type { FrameControllerLoaderArgs } from '@tiyn/app';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { CategoryControllerInterface } from './category-controller.interface.ts';
import { type CategoryModifyFrameParams } from '../../category-modify.frame.tsx';

@Controller()
export class CategoryController implements CategoryControllerInterface {
  constructor(
    @Inject(FormStoreInterface) public readonly formStore: FormStoreInterface,
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>) {
    return await this.findByUuid(args.props.uuid);
  }

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
