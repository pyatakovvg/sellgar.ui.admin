import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

import { ProfileEntity } from './profile.entity.ts';

class MetaEntity {}

export class ResultEntity {
  @Type(() => ProfileEntity)
  @ValidateNested()
  data: ProfileEntity;

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
