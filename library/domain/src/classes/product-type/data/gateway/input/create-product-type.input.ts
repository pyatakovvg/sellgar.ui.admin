import type { ProductTypeFieldInput } from './product-type-field.input.ts';

export interface CreateProductTypeInput {
  name: string;
  productFields: ProductTypeFieldInput[];
  variantFields: ProductTypeFieldInput[];
}
