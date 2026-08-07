import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';
import type { CreateUserInput } from '../input/create-user.input.ts';

export class CreateUserDto implements CreateUserInput {
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsBoolean()
  isBlocked: boolean;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person?: CreatePersonDto;
}
