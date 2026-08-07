import { CreateCategoryInput } from '../data/gateway/input/create-category.input.ts';
import { UpdateCategoryInput } from '../data/gateway/input/update-category.input.ts';

import { CategoryEntity } from '../domain/category.entity.ts';
import { CategoryResultEntity } from '../domain/category-result.entity.ts';

export abstract class CategoryServiceInterface {
  abstract findAll(): Promise<CategoryResultEntity>;
  abstract findByUuid(uuid: string): Promise<CategoryEntity>;
  abstract create(input: CreateCategoryInput): Promise<CategoryEntity>;
  abstract update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity>;
}
