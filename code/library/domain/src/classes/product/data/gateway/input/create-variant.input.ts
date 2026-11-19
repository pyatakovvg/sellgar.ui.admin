import type { ProductVariantInput } from './product-variant.input.ts';

export interface CreateVariantInput {
  version: number;
  typeVersion: number;
  variant: ProductVariantInput;
}
