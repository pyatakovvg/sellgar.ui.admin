import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { PermissionEntity } from './permission.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => PermissionEntity)
  data: PermissionEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
