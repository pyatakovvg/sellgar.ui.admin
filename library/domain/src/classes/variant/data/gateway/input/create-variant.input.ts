export interface ProductVariantInput {
  name: string;
  description: string;
}

export interface CreateVariantInput {
  name: string;
  description: string;
  categoryUuid: string;
  brandUuid: string;
  variants: ProductVariantInput[];
}
