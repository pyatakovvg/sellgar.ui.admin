import type { CreateProductInput, ProductEntity } from '@library/domain';

type ProductPropertyFormData = NonNullable<CreateProductInput['properties']>[number];
type ProductVariantInput = CreateProductInput['variants'][number];
type ProductVariantImageFormData = NonNullable<ProductVariantInput['images']>[number];

export interface ProductVariantFormData extends Omit<ProductVariantInput, 'images' | 'properties'> {
  images: ProductVariantImageFormData[];
  properties: ProductPropertyFormData[];
}

export interface ProductFormData extends Omit<CreateProductInput, 'properties' | 'variants'> {
  properties: ProductPropertyFormData[];
  variants: ProductVariantFormData[];
}

export const createEmptyProperty = (): ProductPropertyFormData => ({
  propertyUuid: '',
  optionUuid: null,
  value: '',
});

export const createEmptyVariant = (): ProductVariantFormData => ({
  images: [],
  name: '',
  description: '',
  properties: [],
});

export const createEmptyProduct = (): ProductFormData => ({
  name: '',
  brandUuid: '',
  categoryUuid: '',
  description: '',
  properties: [],
  variants: [createEmptyVariant()],
});

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

export const toProductFormData = (product?: ProductEntity): ProductFormData => {
  if (!product) {
    return createEmptyProduct();
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
    variants: variants.length > 0 ? variants : [createEmptyVariant()],
  };
};

export const copyVariantFormData = (variant: ProductVariantFormData): ProductVariantFormData => ({
  name: variant.name,
  description: variant.description,
  properties: variant.properties.map((property) => ({
    propertyUuid: property.propertyUuid,
    optionUuid: property.optionUuid ?? null,
    value: property.value,
  })),
  images: variant.images.map((image) => ({
    imageUuid: image.imageUuid,
    file: image.file,
    alt: image.alt ?? null,
  })),
});
