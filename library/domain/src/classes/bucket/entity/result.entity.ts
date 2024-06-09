import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { BucketEntity } from './bucket.entity.ts';

class MetaEntity {}

export class ResultEntity {
  @ValidateNested()
  @Type(() => BucketEntity)
  data: BucketEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
