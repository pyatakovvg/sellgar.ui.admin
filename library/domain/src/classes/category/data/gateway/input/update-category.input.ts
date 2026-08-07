import type { CreateCategoryInput } from './create-category.input.ts';

export interface UpdateCategoryInput extends CreateCategoryInput {
  uuid: string;
  version: number;
}
