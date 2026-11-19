import type { ProductPropertyInput } from './product-property.input.ts';

export interface UpdateProductInput {
  version: number;
  typeVersion: number;
  name?: string;
  description?: string | null;
  brandCode?: string;
  properties?: ProductPropertyInput[];
}
