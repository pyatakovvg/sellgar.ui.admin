import type { ProductPropertyInput } from './product-property.input.ts';
import type { ProductVariantImageInput } from './product-variant-image.input.ts';

export interface UpdateVariantInput {
  version: number;
  typeVersion: number;
  name?: string;
  description?: string | null;
  properties?: ProductPropertyInput[];
  images?: ProductVariantImageInput[];
}
