import type { PropertyOptionExtraInput } from './property-option-extra.input.ts';

export interface UpdatePropertyOptionInput {
  version: number;
  name: string;
  sortOrder: number;
  extras: PropertyOptionExtraInput[];
}
