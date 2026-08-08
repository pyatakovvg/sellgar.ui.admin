import type { CategoryImageInput } from './category-image.input.ts';

export interface CreateCategoryInput {
  parentUuid?: string | null;
  code: string;
  name: string;
  description: string;
  image?: CategoryImageInput | null;
}
