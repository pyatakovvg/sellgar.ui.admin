import { ProductPropertiesMapper } from '@library/product-form';
import type { ProductVariantInput } from '@library/domain';
import type { VariantModifyResultEntity } from '../domain/variant-modify-result.entity.ts';
import type { VariantFormInput } from '../input/variant-form.input.ts';

export class VariantFormMapper {
  static toFormInput(data: VariantModifyResultEntity): VariantFormInput {
    return {
      version: data.version,
      typeVersion: data.typeVersion,
      name: data.variant?.name ?? '',
      description: data.variant?.description ?? '',
      properties: ProductPropertiesMapper.createProperties(data.fields),
      images: data.variant?.images.map((image) => ({ imageUuid: image.imageUuid, sortOrder: image.sortOrder })) ?? [],
    };
  }

  static toVariantInput(input: VariantFormInput): ProductVariantInput {
    return {
      name: input.name,
      description: input.description || null,
      properties: ProductPropertiesMapper.toAssignments(input.properties),
      images: input.images.map((image, sortOrder) => ({ ...image, sortOrder })),
    };
  }
}
