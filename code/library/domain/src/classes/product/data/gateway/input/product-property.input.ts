export interface PropertyValueInput {
  valueText?: string;
  valueInteger?: string;
  valueDecimal?: string;
  valueBoolean?: boolean;
  valueDate?: string;
  valueOptionCode?: string;
}

export interface ProductPropertyInput {
  propertyCode: string;
  values: PropertyValueInput[];
}
