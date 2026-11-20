import type { ProductPropertyFormInput } from '@library/product-form';
import type { ProductVariantInput } from '@library/domain';

export interface VariantFormInput {
  version: number;
  typeVersion: number;
  name: string;
  description: string;
  properties: ProductPropertyFormInput[];
  images: NonNullable<ProductVariantInput['images']>;
}
