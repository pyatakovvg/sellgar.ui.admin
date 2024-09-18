import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { BrandEntity } from './brand.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => BrandEntity)
  data: BrandEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
