export interface TemplateFieldFormInput {
  propertyCode: string;
  required: boolean;
  multiple: boolean;
}

export interface TemplateFormInput {
  uuid?: string;
  version?: number;
  name: string;
  productFields: TemplateFieldFormInput[];
  variantFields: TemplateFieldFormInput[];
}
