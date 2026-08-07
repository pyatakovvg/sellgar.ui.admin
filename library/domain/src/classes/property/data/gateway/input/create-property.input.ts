export interface PropertyOptionMetadataInput {
  uuid?: string;
  valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';
  sortOrder?: number;
  textValue?: string | null;
  colorValue?: string | null;
  fileUuid?: string | null;
  iconCode?: string | null;
}

export interface PropertyOptionInput {
  uuid?: string;
  code: string;
  name: string;
  sortOrder?: number;
  metadata?: PropertyOptionMetadataInput[];
}

export interface CreatePropertyInput {
  unitUuid?: string | null;
  code: string;
  name: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'OPTION' | 'DATE';
  description: string;
  options?: PropertyOptionInput[];
}
