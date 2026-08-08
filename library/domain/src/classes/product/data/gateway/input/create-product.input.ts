import type { ProductPropertyInput } from './product-property.input.ts';
import type { ProductVariantInput } from './product-variant.input.ts';

export interface CreateProductInput {
  name: string;
  description: string;
  categoryUuid: string;
  brandUuid: string;
  properties?: ProductPropertyInput[];
  variants: ProductVariantInput[];
}
