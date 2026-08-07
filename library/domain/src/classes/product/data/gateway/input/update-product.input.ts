import type { CreateProductInput } from './create-product.input.ts';

export interface UpdateProductInput extends CreateProductInput {
  uuid: string;
  version: number;
}
