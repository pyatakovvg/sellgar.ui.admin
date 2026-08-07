import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { VariantEntity } from './variant.entity.ts';

export class ProductVariantResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => VariantEntity)
  data: VariantEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
