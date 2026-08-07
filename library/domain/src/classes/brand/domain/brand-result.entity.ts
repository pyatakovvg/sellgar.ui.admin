import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { BrandEntity } from './brand.entity.ts';

export class BrandResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BrandEntity)
  data: BrandEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
