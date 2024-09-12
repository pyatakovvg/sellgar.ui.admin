import { Type } from 'class-transformer';
import { IsString, IsEmail, IsUUID, IsBoolean, ValidateNested } from 'class-validator';

import { UserEntity } from '../../user/entity/user.entity';

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
