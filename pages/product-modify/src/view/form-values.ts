import type { ProductEntity } from '@library/domain';

export interface ProductPropertyFormData {
  uuid?: string;
  propertyUuid: string;
  value: string;
  order: number;
}

export interface ProductVariantImageFormData {
  uuid?: string;
  localId?: string;
  imageUuid?: string;
  file?: File;
  fileName?: string;
  alt?: string | null;
}

export interface ProductVariantFormData {
  images: ProductVariantImageFormData[];
  uuid?: string;
  name: string;
  description: string;
  properties: ProductPropertyFormData[];
}

export interface ProductFormData {
  name: string;
  brandUuid: string;
  categoryUuid: string;
  description: string;
  properties: ProductPropertyFormData[];
  variants: ProductVariantFormData[];
}

export const createEmptyProperty = (): ProductPropertyFormData => ({
  propertyUuid: '',
  value: '',
  order: 0,
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

export const toProductFormData = (product?: ProductEntity): ProductFormData => {
  if (!product) {
    return createEmptyProduct();
  }

  const variants = (product.variants ?? []).map((variant) => ({
    uuid: variant.uuid,
    name: variant.name ?? '',
    description: variant.description ?? '',
    properties: (variant.properties ?? []).map((property, order) => ({
      uuid: property.uuid,
      propertyUuid: property.propertyUuid,
      value: property.value ?? '',
      order: property.order ?? order,
    })),
    images: (variant.images ?? []).map((image) => ({
      uuid: image.uuid,
      imageUuid: image.imageUuid,
      fileName: image.image?.fileName,
      alt: image.alt ?? null,
    })),
  }));

  return {
    name: product.name ?? '',
    brandUuid: product.brandUuid ?? '',
    categoryUuid: product.categoryUuid ?? '',
    description: product.description ?? '',
    properties: (product.properties ?? []).map((property, order) => ({
      uuid: property.uuid,
      propertyUuid: property.propertyUuid,
      value: property.value ?? '',
      order: property.order ?? order,
    })),
    variants: variants.length > 0 ? variants : [createEmptyVariant()],
  };
};

export const normalizeProductFormData = (product: ProductFormData): ProductFormData => ({
  ...product,
  properties: product.properties.map((property, order) => ({
    ...property,
    order,
  })),
  variants: product.variants.map((variant) => ({
    ...variant,
    properties: variant.properties.map((property, order) => ({
      ...property,
      order,
    })),
  })),
});

export const copyVariantFormData = (variant: ProductVariantFormData): ProductVariantFormData => ({
  name: variant.name,
  description: variant.description,
  properties: variant.properties.map((property, order) => ({
    propertyUuid: property.propertyUuid,
    value: property.value,
    order,
  })),
  images: variant.images.map((image) => ({
    imageUuid: image.imageUuid,
    file: image.file,
    localId: image.file ? globalThis.crypto.randomUUID() : undefined,
    fileName: image.fileName,
    alt: image.alt ?? null,
  })),
});
