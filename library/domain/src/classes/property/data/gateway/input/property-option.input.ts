import type { PropertyOptionMetadataInput } from './property-option-metadata.input.ts';

export interface PropertyOptionInput {
  uuid?: string;
  code: string;
  name: string;
  sortOrder?: number;
  metadata?: PropertyOptionMetadataInput[];
}
