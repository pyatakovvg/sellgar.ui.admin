import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserEntity } from './user.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @Type(() => UserEntity)
  @ValidateNested({ each: true })
  data: UserEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
