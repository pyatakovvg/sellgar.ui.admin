import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { RoleEntity } from './role.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => RoleEntity)
  data: RoleEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
