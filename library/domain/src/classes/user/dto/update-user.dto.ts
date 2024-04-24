import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { UpdatePersonDto } from './update-person.dto.ts';
import { UpdateRoleDto } from '../../role/dto/update-role.dto.ts';

export class UpdateUserDto {
  @IsUUID()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  person: UpdatePersonDto;

  @ValidateNested({ each: true })
  @Type(() => UpdateRoleDto)
  roles: UpdateRoleDto[];
}
