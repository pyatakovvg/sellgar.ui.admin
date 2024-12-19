import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, ValidateNested, IsOptional } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsString()
  @ValidateNested({ each: true })
  roles: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}
