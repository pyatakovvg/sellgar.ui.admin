import { Type } from 'class-transformer';
import { IsString, IsEmail, IsUUID, IsBoolean, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { UserEntity } from '../user/user.entity.ts';

export class ProfileEntity {
  @IsUUID()
  uuid: string;

  @IsEmail()
  login: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsString({ each: true })
  roles: string[];

  @IsString({ each: true })
  permissions: string[];

  @Type(() => UserEntity)
  @ValidateNested()
  user: UserEntity;
}

export class ProfileResultEntity {
  @Type(() => ProfileEntity)
  @ValidateNested()
  data: ProfileEntity;

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
