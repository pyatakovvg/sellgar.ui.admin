import type { CreateBrandInput, UpdateBrandInput } from '@library/domain';
import type { BrandModifyInput } from '../input/brand-modify.input.ts';

export class BrandModifyMapper {
  static create(input: BrandModifyInput): CreateBrandInput {
    return {
      code: input.code,
      name: input.name,
      description: input.description,
      images: input.images,
    };
  }

  static update(input: BrandModifyInput): UpdateBrandInput {
    if (input.version === undefined) {
      throw new Error('Не передана версия бренда.');
    }

    return {
      version: input.version,
      name: input.name,
      description: input.description,
      images: input.images,
    };
  }
}
