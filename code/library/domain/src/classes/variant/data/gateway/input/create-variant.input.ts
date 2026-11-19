import type { ProductVariantInput } from './product-variant.input.ts';

export interface CreateVariantInput {
  name: string;
  description: string;
  categoryUuid: string;
  brandUuid: string;
  variants: ProductVariantInput[];
}
