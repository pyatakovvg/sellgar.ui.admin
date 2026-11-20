import type { PropertyKind } from '@library/domain';

export interface PropertyValueFormInput {
  value: string | boolean | null;
}

export interface ProductPropertyFormInput {
  propertyCode: string;
  propertyName: string;
  kind: PropertyKind;
  unitCode: string | null;
  required: boolean;
  multiple: boolean;
  options: Array<{ code: string; name: string }>;
  values: PropertyValueFormInput[];
}

export interface ProductPropertiesFormInput {
  properties: ProductPropertyFormInput[];
}
