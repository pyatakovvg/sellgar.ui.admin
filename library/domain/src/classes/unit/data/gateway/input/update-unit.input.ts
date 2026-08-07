import type { CreateUnitInput } from './create-unit.input.ts';

export interface UpdateUnitInput extends CreateUnitInput {
  version: number;
}
