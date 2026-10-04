export interface PropertyOptionExtraInput {
  type: 'TEXT' | 'COLOR' | 'IMAGE';
  sortOrder?: number;
  textDisplay?: 'TEXT' | 'ICON';
  valueText?: string;
  valueColor?: string;
  imageUuid?: string;
}
