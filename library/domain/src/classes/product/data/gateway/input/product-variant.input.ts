import type { ProductPropertyInput } from './product-property.input.ts';
import type { ProductVariantImageInput } from './product-variant-image.input.ts';

export interface ProductVariantInput {
  uuid?: string;
  images?: ProductVariantImageInput[];
  name: string;
  description: string;
  properties: ProductPropertyInput[];
}
