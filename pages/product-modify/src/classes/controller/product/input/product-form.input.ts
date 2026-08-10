import type { CreateProductInput } from '@library/domain';

type ProductPropertyFormInput = NonNullable<CreateProductInput['properties']>[number];
type ProductVariantInput = CreateProductInput['variants'][number];
type ProductVariantImageFormInput = NonNullable<ProductVariantInput['images']>[number];

export interface ProductVariantFormInput extends Omit<ProductVariantInput, 'images' | 'properties'> {
  images: ProductVariantImageFormInput[];
  properties: ProductPropertyFormInput[];
}

export interface ProductFormInput extends Omit<CreateProductInput, 'properties' | 'variants'> {
  uuid?: string;
  version?: number;
  properties: ProductPropertyFormInput[];
  variants: ProductVariantFormInput[];
}
