import type { CategoryEntity } from '../domain/category.entity.ts';
import type { CategoryTreeEntity } from '../domain/category-tree.entity.ts';
import type { CreateCategoryInput } from '../data/gateway/input/create-category.input.ts';
import type { UpdateCategoryInput } from '../data/gateway/input/update-category.input.ts';

export abstract class CategoryServiceInterface {
  abstract getTree(shopUuid: string): Promise<CategoryTreeEntity>;
  abstract findByUuid(uuid: string): Promise<CategoryEntity>;
  abstract create(input: CreateCategoryInput): Promise<CategoryEntity>;
  abstract update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity>;
}
