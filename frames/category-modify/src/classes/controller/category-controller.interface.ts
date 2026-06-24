import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';
import { type FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { type CategoryModifyFrameParams } from '../../category-modify.frame.tsx';

export abstract class CategoryControllerInterface implements FrameControllerInterface<CategoryModifyFrameParams> {
  abstract readonly formStore: FormStoreInterface;

  abstract loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>): Promise<CategoryEntity>;
  abstract findByUuid(uuid?: string): Promise<CategoryEntity>;

  abstract create(data: CreateCategoryDto): Promise<CategoryEntity>;
  abstract update(uuid: string, data: UpdateCategoryDto): Promise<CategoryEntity>;
}
