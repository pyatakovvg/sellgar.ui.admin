import type { PropertyOptionInput, PropertyOptionExtraInput } from '@library/domain';

export interface PropertySaveOptionInput extends PropertyOptionInput {
  sortOrder: number;
  extras: PropertyOptionExtraInput[];
}
