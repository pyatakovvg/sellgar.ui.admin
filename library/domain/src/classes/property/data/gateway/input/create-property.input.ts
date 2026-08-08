import type { PropertyOptionInput } from './property-option.input.ts';

export interface CreatePropertyInput {
  unitUuid?: string | null;
  code: string;
  name: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'OPTION' | 'DATE';
  description: string;
  options?: PropertyOptionInput[];
}
