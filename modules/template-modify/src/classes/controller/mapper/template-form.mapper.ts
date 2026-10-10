import type {
  CreateProductTypeInput,
  ProductTypeEntity,
  ProductTypeFieldInput,
  UpdateProductTypeInput,
} from '@library/domain';

import type { TemplateFieldFormInput, TemplateFormInput } from '../input/template-form.input.ts';

export class TemplateFormMapper {
  static toFormInput(template?: ProductTypeEntity): TemplateFormInput {
    if (!template) {
      return { name: '', productFields: [], variantFields: [] };
    }

    return {
      uuid: template.uuid,
      version: template.version,
      name: template.name,
      productFields: this.toFormFields(template.productFields),
      variantFields: this.toFormFields(template.variantFields),
    };
  }

  static toCreateInput(input: TemplateFormInput): CreateProductTypeInput {
    return {
      name: input.name,
      productFields: this.toFields(input.productFields),
      variantFields: this.toFields(input.variantFields),
    };
  }

  static toUpdateInput(input: TemplateFormInput, version: number): UpdateProductTypeInput {
    return { version, ...this.toCreateInput(input) };
  }

  private static toFormFields(fields: ProductTypeEntity['productFields']): TemplateFieldFormInput[] {
    return [...fields]
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map(({ propertyCode, required, multiple }) => ({ propertyCode, required, multiple }));
  }

  private static toFields(fields: TemplateFieldFormInput[]): ProductTypeFieldInput[] {
    return fields.map((field, sortOrder) => ({ ...field, sortOrder }));
  }
}
