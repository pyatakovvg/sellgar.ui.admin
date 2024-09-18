import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { ProfileEntity } from './profile.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @Type(() => ProfileEntity)
  @ValidateNested()
  data: ProfileEntity;

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
