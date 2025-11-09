import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';
import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class CategoryControllerInterface {
  abstract readonly formStore: FormStoreInterface;

  abstract findByUuid(uuid?: string): Promise<CategoryEntity>;

  abstract create(data: CreateCategoryDto): Promise<CategoryEntity>;
  abstract update(uuid: string, data: UpdateCategoryDto): Promise<CategoryEntity>;
}
