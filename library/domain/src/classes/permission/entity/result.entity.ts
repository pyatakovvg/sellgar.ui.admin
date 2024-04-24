import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { PermissionEntity } from './permission.entity.ts';

class MetaEntity {
  @IsNumber()
  totalRows: number;
}

export class ResultEntity {
  @ValidateNested()
  @Type(() => PermissionEntity)
  data: PermissionEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
