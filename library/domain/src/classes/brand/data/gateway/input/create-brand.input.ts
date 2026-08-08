import type { BrandImageInput } from './brand-image.input.ts';

export interface CreateBrandInput {
  code: string;
  name: string;
  description: string;
  image?: BrandImageInput | null;
}
