import type { CreateVariantInput } from './create-variant.input.ts';

export interface UpdateVariantInput extends CreateVariantInput {
  uuid: string;
  version: number;
}
