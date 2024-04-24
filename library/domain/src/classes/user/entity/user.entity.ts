import { Type } from 'class-transformer';
import { IsUUID, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';

import { PersonEntity } from './person.entity.ts';
import { RoleEntity } from '../../role/entity/role.entity.ts';

export class UserEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isBlocked: boolean;

  @ValidateNested()
  @Type(() => PersonEntity)
  person: PersonEntity;

  @ValidateNested({ each: true })
  @Type(() => RoleEntity)
  roles: RoleEntity[];

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
