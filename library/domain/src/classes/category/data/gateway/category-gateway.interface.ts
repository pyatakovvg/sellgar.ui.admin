import type { CategoryEntity } from '../../domain/category.entity.ts';
import type { CategoryTreeEntity } from '../../domain/category-tree.entity.ts';
import type { CreateCategoryInput } from './input/create-category.input.ts';
import type { UpdateCategoryInput } from './input/update-category.input.ts';

export abstract class CategoryGatewayInterface {
  abstract getTree(shopUuid: string): Promise<CategoryTreeEntity>;
  abstract findByUuid(uuid: string): Promise<CategoryEntity>;
  abstract create(input: CreateCategoryInput): Promise<CategoryEntity>;
  abstract update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity>;
}
