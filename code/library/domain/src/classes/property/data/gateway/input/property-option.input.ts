import type { PropertyOptionExtraInput } from './property-option-extra.input.ts';

export interface PropertyOptionInput {
  code: string;
  name: string;
  sortOrder?: number;
  extras?: PropertyOptionExtraInput[];
}
