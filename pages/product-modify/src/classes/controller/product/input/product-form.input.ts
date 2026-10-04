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

export interface ProductVariantImageFormInput {
  imageUuid?: string;
  file?: File;
  sortOrder?: number;
}

export interface ProductVariantFormInput {
  uuid?: string;
  name: string;
  description: string;
  images: ProductVariantImageFormInput[];
  properties: ProductPropertyFormInput[];
}

export interface ProductFormInput {
  uuid?: string;
  version?: number;
  typeUuid: string;
  typeVersion?: number;
  name: string;
  description: string;
  brandCode: string;
  properties: ProductPropertyFormInput[];
  variants: ProductVariantFormInput[];
}
