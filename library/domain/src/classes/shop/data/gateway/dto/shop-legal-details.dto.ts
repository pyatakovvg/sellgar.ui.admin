import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ShopLegalForm } from '../../../domain/shop-legal-form.enum.ts';
import type { ShopLegalDetailsInput } from '../input/shop-details.input.ts';

export class ShopLegalDetailsDto implements ShopLegalDetailsInput {
  @Expose()
  @IsEnum(ShopLegalForm)
  legalForm: ShopLegalForm;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  legalName?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  entrepreneurFullName?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  registrationAuthority?: string | null;

  @Expose()
  @IsString()
  @Matches(/^(?:\d{10}|\d{12})$/)
  inn: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Length(9, 9)
  @Matches(/^\d+$/)
  kpp?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @Length(13, 13)
  @Matches(/^\d+$/)
  ogrn?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @Length(15, 15)
  @Matches(/^\d+$/)
  ogrnip?: string | null;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  legalAddress: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  actualLocation?: string | null;

  @Expose()
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email?: string | null;

  @Expose()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string | null;
}
