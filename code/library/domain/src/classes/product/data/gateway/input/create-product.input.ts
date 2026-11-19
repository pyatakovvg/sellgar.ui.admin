import type { ProductPropertyInput } from './product-property.input.ts';
import type { ProductVariantInput } from './product-variant.input.ts';

export interface CreateProductInput {
  typeUuid: string;
  typeVersion: number;
  name: string;
  description?: string | null;
  brandCode: string;
  properties?: ProductPropertyInput[];
  variants: ProductVariantInput[];
}
