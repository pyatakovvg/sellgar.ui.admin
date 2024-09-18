import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { BucketEntity } from './bucket.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => BucketEntity)
  data: BucketEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
