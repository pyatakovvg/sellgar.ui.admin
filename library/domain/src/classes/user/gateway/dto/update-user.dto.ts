import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { UpdatePersonDto } from './update-person.dto.ts';

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
}
