import { ProductEntity } from '@library/domain';

import { UpdateProductDto } from '../store/form/dto/update-product.dto.ts';

export const convertEntityToUpdateDtoUtil = (entity: ProductEntity): UpdateProductDto => {
  return {
    uuid: entity.uuid,
    categoryUuid: entity.category.uuid,
    brandUuid: entity.brand.uuid,
    name: entity.name,
    description: entity.description,
    variants: entity.variants.map((v) => ({
      uuid: v.uuid,
      article: v.article,
      name: v.name,
      description: v.description,
    })),
    properties: entity.properties.map((p) => ({
      uuid: p.uuid,
      propertyUuid: p.property.uuid,
      value: p.value,
    })),
  };
};
