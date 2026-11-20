import type { ProductPropertyFormInput } from '@library/product-form';

export interface ProductFormInput {
  uuid?: string;
  version?: number;
  typeUuid: string;
  typeVersion?: number;
  name: string;
  description: string;
  brandCode: string;
  properties: ProductPropertyFormInput[];
}
