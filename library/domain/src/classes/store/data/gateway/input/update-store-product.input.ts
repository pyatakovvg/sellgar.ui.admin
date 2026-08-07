import type { CreateStoreProductInput } from './create-store-product.input.ts';

export interface UpdateStoreProductInput extends CreateStoreProductInput {
  uuid: string;
  expectedVersion: number;
}
