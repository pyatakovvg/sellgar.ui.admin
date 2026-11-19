import type {
  CreateProductInput,
  ProductEntity,
  ProductFieldEntity,
  ProductPropertyInput,
  ProductTypeEntity,
  ProductTypeFieldEntity,
  ProductVariantInput,
  PropertyValueInput,
  UpdateProductInput,
} from '@library/domain';
import { PropertyKind } from '@library/domain';

import type {
  ProductFormInput,
  ProductPropertyFormInput,
  ProductVariantFormInput,
  PropertyValueFormInput,
} from '../input/product-form.input.ts';

type FieldDefinition = ProductFieldEntity | ProductTypeFieldEntity;

export class ProductFormMapper {
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

  static createEmptyVariant(fields: FieldDefinition[] = []): ProductVariantFormInput {
    return {
      images: [],
      name: '',
      description: '',
      properties: this.createProperties(fields),
    };
  }

  static createVariantsForType(
    type: ProductTypeEntity,
    current: ProductVariantFormInput[] = [],
  ): ProductVariantFormInput[] {
    const variants = current.length > 0 ? current : [this.createEmptyVariant()];
    return variants.map((variant) => ({
      ...variant,
      properties: this.mergeProperties(type.variantFields, variant.properties),
    }));
  }

  static createProductPropertiesForType(
    type: ProductTypeEntity,
    current: ProductPropertyFormInput[] = [],
  ): ProductPropertyFormInput[] {
    return this.mergeProperties(type.productFields, current);
  }

  static toFormInput(product?: ProductEntity): ProductFormInput {
    if (!product) {
      return {
        typeUuid: '',
        name: '',
        brandCode: '',
        description: '',
        properties: [],
        variants: [this.createEmptyVariant()],
      };
    }

    return {
      uuid: product.uuid,
      version: product.version,
      typeUuid: product.typeUuid,
      typeVersion: product.typeVersion,
      name: product.name,
      brandCode: product.brandCode,
      description: product.description ?? '',
      properties: this.createProperties(product.properties),
      variants: product.variants.map((variant) => ({
        uuid: variant.uuid,
        name: variant.name,
        description: variant.description ?? '',
        properties: this.createProperties(variant.properties),
        images: variant.images.map((image) => ({
          imageUuid: image.imageUuid,
          sortOrder: image.sortOrder,
        })),
      })),
    };
  }

  static toCreateInput(input: ProductFormInput): CreateProductInput {
    if (input.typeVersion === undefined) {
      throw new Error('Не выбрана версия типа товара.');
    }

    return {
      typeUuid: input.typeUuid,
      typeVersion: input.typeVersion,
      name: input.name,
      description: input.description || null,
      brandCode: input.brandCode,
      properties: this.toAssignments(input.properties),
      variants: input.variants.map((variant) => this.toVariantInput(variant)),
    };
  }

  static toUpdateInput(input: ProductFormInput, version: number): UpdateProductInput {
    if (input.typeVersion === undefined) {
      throw new Error('Не выбрана версия типа товара.');
    }

    return {
      version,
      typeVersion: input.typeVersion,
      name: input.name,
      description: input.description || null,
      brandCode: input.brandCode,
      properties: this.toAssignments(input.properties),
    };
  }

  static toVariantInput(input: ProductVariantFormInput): ProductVariantInput {
    return {
      name: input.name,
      description: input.description || null,
      properties: this.toAssignments(input.properties),
      images: input.images.map((image, sortOrder) => ({ ...image, sortOrder })),
    };
  }

  static copyVariant(input: ProductVariantFormInput): ProductVariantFormInput {
    return {
      name: input.name,
      description: input.description,
      properties: input.properties.map((property) => ({
        ...property,
        values: property.values.map((value) => ({ ...value })),
      })),
      images: input.images.map((image) => ({ ...image })),
    };
  }

  private static mergeProperties(
    fields: ProductTypeFieldEntity[],
    current: ProductPropertyFormInput[],
  ): ProductPropertyFormInput[] {
    const currentByCode = new Map(current.map((property) => [property.propertyCode, property]));
    return this.createProperties(fields).map((property) => ({
      ...property,
      values: currentByCode.get(property.propertyCode)?.values.map((value) => ({ ...value })) ?? property.values,
    }));
  }

  private static toAssignments(properties: ProductPropertyFormInput[]): ProductPropertyInput[] {
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
