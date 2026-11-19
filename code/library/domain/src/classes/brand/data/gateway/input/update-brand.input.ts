import type { BrandImageInput } from './brand-image.input.ts';

export interface UpdateBrandInput {
  version: number;
  name: string;
  description?: string | null;
  images?: BrandImageInput[];
}
