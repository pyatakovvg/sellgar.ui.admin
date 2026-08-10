import type { CreateProductInput, ProductEntity, UpdateProductInput } from '@library/domain';

import type { ProductFormInput, ProductVariantFormInput } from '../input/product-form.input.ts';

const resolveOptionUuid = (property: NonNullable<ProductEntity['properties']>[number]): string | null => {
  if (property.optionUuid) {
    return property.optionUuid;
  }

  if (property.property?.type !== 'OPTION') {
    return null;
  }

  const value = property.value?.trim().toLowerCase();

  if (!value) {
    return null;
  }

  return (
    property.property.options?.find(
      (option) => option.code.trim().toLowerCase() === value || option.name.trim().toLowerCase() === value,
    )?.uuid ?? null
  );
};

export class ProductFormMapper {
  static createEmptyProperty(): ProductFormInput['properties'][number] {
    return {
      propertyUuid: '',
      optionUuid: null,
      value: '',
    };
  }

  static createEmptyVariant(): ProductVariantFormInput {
    return {
      images: [],
      name: '',
      description: '',
      properties: [],
    };
  }

  static toFormInput(product?: ProductEntity): ProductFormInput {
    if (!product) {
      return {
        name: '',
        brandUuid: '',
        categoryUuid: '',
        description: '',
        properties: [],
        variants: [ProductFormMapper.createEmptyVariant()],
      };
    }

    const variants = (product.variants ?? []).map((variant) => ({
      uuid: variant.uuid,
      name: variant.name ?? '',
      description: variant.description ?? '',
      properties: (variant.properties ?? []).map((property) => ({
        uuid: property.uuid,
        propertyUuid: property.propertyUuid,
        optionUuid: resolveOptionUuid(property),
        value: property.value ?? '',
      })),
      images: (variant.images ?? []).map((image) => ({
        uuid: image.uuid,
        imageUuid: image.imageUuid,
        alt: image.alt ?? null,
      })),
    }));

    return {
      uuid: product.uuid,
      version: product.version,
      name: product.name ?? '',
      brandUuid: product.brandUuid ?? '',
      categoryUuid: product.categoryUuid ?? '',
      description: product.description ?? '',
      properties: (product.properties ?? []).map((property) => ({
        uuid: property.uuid,
        propertyUuid: property.propertyUuid,
        optionUuid: resolveOptionUuid(property),
        value: property.value ?? '',
      })),
      variants: variants.length > 0 ? variants : [ProductFormMapper.createEmptyVariant()],
    };
  }

  static toCreateInput(input: ProductFormInput): CreateProductInput {
    return {
      name: input.name,
      description: input.description,
      categoryUuid: input.categoryUuid,
      brandUuid: input.brandUuid,
      properties: input.properties,
      variants: input.variants,
    };
  }

  static toUpdateInput(input: ProductFormInput, uuid: string, version: number): UpdateProductInput {
    return {
      ...ProductFormMapper.toCreateInput(input),
      uuid,
      version,
    };
  }

  static copyVariant(input: ProductVariantFormInput): ProductVariantFormInput {
    return {
      name: input.name,
      description: input.description,
      properties: input.properties.map((property) => ({
        propertyUuid: property.propertyUuid,
        optionUuid: property.optionUuid ?? null,
        value: property.value,
      })),
      images: input.images.map((image) => ({
        imageUuid: image.imageUuid,
        file: image.file,
        alt: image.alt ?? null,
      })),
    };
  }
}
