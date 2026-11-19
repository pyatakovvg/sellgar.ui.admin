import type { ProductTypeFieldInput } from './product-type-field.input.ts';

export interface UpdateProductTypeInput {
  version: number;
  name: string;
  productFields: ProductTypeFieldInput[];
  variantFields: ProductTypeFieldInput[];
}
