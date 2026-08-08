export interface PropertyOptionMetadataInput {
  uuid?: string;
  valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';
  sortOrder?: number;
  textValue?: string | null;
  colorValue?: string | null;
  fileUuid?: string | null;
  iconCode?: string | null;
}
