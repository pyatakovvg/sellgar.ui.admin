import { Type } from 'class-transformer';
import { IsString, IsUUID, IsBoolean, IsDateString, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class UserEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  login: string;

  @IsBoolean()
  isBlocked: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

export class UserResultEntity {
  @Type(() => UserEntity)
  @ValidateNested({ each: true })
  data: UserEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
