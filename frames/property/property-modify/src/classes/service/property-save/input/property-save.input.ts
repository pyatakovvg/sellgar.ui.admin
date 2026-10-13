import type { CreatePropertyInput } from '@library/domain';
import type { PropertySaveOptionInput } from './property-save-option.input.ts';

export interface PropertySaveInput extends CreatePropertyInput {
  version?: number;
  options: PropertySaveOptionInput[];
}
