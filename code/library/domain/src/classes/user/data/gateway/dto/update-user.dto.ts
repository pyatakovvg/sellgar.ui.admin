import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { UpdatePersonDto } from './update-person.dto.ts';
import type { UpdateUserInput } from '../input/update-user.input.ts';

export class UpdateUserDto implements UpdateUserInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsBoolean()
  isBlocked: boolean;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  person?: UpdatePersonDto;
}
