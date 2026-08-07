import type { CreatePropertyInput } from './create-property.input.ts';

export interface UpdatePropertyInput extends CreatePropertyInput {
  uuid: string;
  version: number;
}
