import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, ValidateNested, IsOptional } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';
import { CreateRoleDto } from '../../role/dto/create-role.dto.ts';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;

  @IsString({ each: true })
  claims: string[];

  @ValidateNested({ each: true })
  @Type(() => CreateRoleDto)
  roles: CreateRoleDto[];
}
