import type {
  ProductFieldEntity,
  ProductTypeFieldEntity,
  ProductPropertyInput,
  PropertyValueInput,
} from '@library/domain';
import { PropertyKind } from '@library/domain';
import type { ProductPropertyFormInput, PropertyValueFormInput } from './property-form.input.ts';

type FieldDefinition = ProductFieldEntity | ProductTypeFieldEntity;

export class ProductPropertiesMapper {
  static createProperties(fields: FieldDefinition[]): ProductPropertyFormInput[] {
    return [...fields]
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((field) => ({
        propertyCode: field.propertyCode,
        propertyName: field.property.name,
        kind: field.property.kind,
        unitCode: field.property.unitCode,
        required: field.required,
        multiple: field.multiple,
        options: field.property.options.map((option) => ({ code: option.code, name: option.name })),
        values:
          'values' in field && field.values.length > 0
            ? field.values.map((value) => this.fromValue(field.property.kind, value))
            : [{ value: null }],
      }));
  }

  static mergeProperties(
    fields: ProductTypeFieldEntity[],
    current: ProductPropertyFormInput[],
  ): ProductPropertyFormInput[] {
    const currentByCode = new Map(current.map((property) => [property.propertyCode, property]));
    return this.createProperties(fields).map((property) => ({
      ...property,
      values: currentByCode.get(property.propertyCode)?.values.map((value) => ({ ...value })) ?? property.values,
    }));
  }

  static toAssignments(properties: ProductPropertyFormInput[]): ProductPropertyInput[] {
    return properties.map((property) => ({
      propertyCode: property.propertyCode,
      values: property.values
        .filter((value) => this.hasValue(value.value))
        .map((value) => this.toValue(property.kind, value.value)),
    }));
  }

  private static hasValue(value: PropertyValueFormInput['value']): boolean {
    return typeof value === 'boolean' || (typeof value === 'string' && value.length > 0);
  }

  private static toValue(kind: PropertyKind, value: PropertyValueFormInput['value']): PropertyValueInput {
    switch (kind) {
      case PropertyKind.TEXT:
        return { valueText: String(value) };
      case PropertyKind.INTEGER:
        return { valueInteger: String(value) };
      case PropertyKind.DECIMAL:
        return { valueDecimal: String(value) };
      case PropertyKind.BOOLEAN:
        return { valueBoolean: Boolean(value) };
      case PropertyKind.DATE:
        return { valueDate: String(value) };
      case PropertyKind.OPTIONS:
        return { valueOptionCode: String(value) };
    }
  }

  private static fromValue(
    kind: PropertyKind,
    value: {
      valueText?: string | null;
      valueInteger?: string | null;
      valueDecimal?: string | null;
      valueBoolean?: boolean | null;
      valueDate?: string | null;
      valueOptionCode?: string | null;
    },
  ): PropertyValueFormInput {
    switch (kind) {
      case PropertyKind.TEXT:
        return { value: value.valueText ?? null };
      case PropertyKind.INTEGER:
        return { value: value.valueInteger ?? null };
      case PropertyKind.DECIMAL:
        return { value: value.valueDecimal ?? null };
      case PropertyKind.BOOLEAN:
        return { value: value.valueBoolean ?? null };
      case PropertyKind.DATE:
        return { value: value.valueDate ?? null };
      case PropertyKind.OPTIONS:
        return { value: value.valueOptionCode ?? null };
    }
  }
}
