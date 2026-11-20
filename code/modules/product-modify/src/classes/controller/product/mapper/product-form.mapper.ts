import type { CreateProductInput, ProductEntity, ProductTypeEntity, UpdateProductInput } from '@library/domain';
import { ProductPropertiesMapper, type ProductPropertyFormInput } from '@library/product-form';

import type { ProductFormInput } from '../input/product-form.input.ts';

export class ProductFormMapper {
  static createProductPropertiesForType(type: ProductTypeEntity, current: ProductPropertyFormInput[] = []) {
    return ProductPropertiesMapper.mergeProperties(type.productFields, current);
  }

  static toFormInput(product?: ProductEntity): ProductFormInput {
    return {
      uuid: product?.uuid,
      version: product?.version,
      typeUuid: product?.typeUuid ?? '',
      typeVersion: product?.typeVersion,
      name: product?.name ?? '',
      brandCode: product?.brandCode ?? '',
      description: product?.description ?? '',
      properties: ProductPropertiesMapper.createProperties(product?.properties ?? []),
    };
  }

  static toCreateInput(input: ProductFormInput): CreateProductInput {
    if (input.typeVersion === undefined) throw new Error('Не выбран шаблон товара.');
    return {
      typeUuid: input.typeUuid,
      typeVersion: input.typeVersion,
      name: input.name,
      description: input.description || null,
      brandCode: input.brandCode,
      properties: ProductPropertiesMapper.toAssignments(input.properties),
      variants: [],
    };
  }

  static toUpdateInput(input: ProductFormInput, version: number): UpdateProductInput {
    if (input.typeVersion === undefined) throw new Error('Не выбран шаблон товара.');
    return {
      version,
      typeVersion: input.typeVersion,
      name: input.name,
      description: input.description || null,
      brandCode: input.brandCode,
      properties: ProductPropertiesMapper.toAssignments(input.properties),
    };
  }
}
