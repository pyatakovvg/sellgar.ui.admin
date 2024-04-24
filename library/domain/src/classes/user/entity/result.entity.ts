import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

import { UserEntity } from './user.entity.ts';

class MetaEntity {
  @IsNumber()
  totalRows: number;
}

export class ResultEntity {
  @Type(() => UserEntity)
  @ValidateNested({ each: true })
  data: UserEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
