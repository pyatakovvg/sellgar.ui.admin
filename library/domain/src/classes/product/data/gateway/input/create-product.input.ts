export interface ProductPropertyInput {
  uuid?: string;
  propertyUuid: string;
  optionUuid?: string | null;
  value: string;
}

export interface ProductVariantImageInput {
  uuid?: string;
  imageUuid?: string;
  file?: File;
  alt?: string | null;
}

export interface ProductVariantInput {
  uuid?: string;
  images?: ProductVariantImageInput[];
  name: string;
  description: string;
  properties: ProductPropertyInput[];
}

export interface CreateProductInput {
  name: string;
  description: string;
  categoryUuid: string;
  brandUuid: string;
  properties?: ProductPropertyInput[];
  variants: ProductVariantInput[];
}
