export interface ProductVariantOption {
  uuid: string;
  name: string;
}

export interface ProductOption {
  uuid: string;
  name: string;
  variants: ProductVariantOption[];
}
