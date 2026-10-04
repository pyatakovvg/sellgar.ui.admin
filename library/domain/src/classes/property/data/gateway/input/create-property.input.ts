import type { PropertyOptionInput } from './property-option.input.ts';

export interface CreatePropertyInput {
  unitCode?: string | null;
  code: string;
  name: string;
  kind: 'TEXT' | 'INTEGER' | 'DECIMAL' | 'BOOLEAN' | 'DATE' | 'OPTIONS';
  description?: string | null;
  options?: PropertyOptionInput[];
}
