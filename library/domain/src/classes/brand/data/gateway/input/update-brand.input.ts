import type { CreateBrandInput } from './create-brand.input.ts';

export interface UpdateBrandInput extends CreateBrandInput {
  uuid: string;
  version: number;
}
