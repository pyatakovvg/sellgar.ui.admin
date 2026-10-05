import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import type { CreateShopInput } from '../input/create-shop.input.ts';
import { ShopAddressDto } from './shop-address.dto.ts';
import { ShopContactDto } from './shop-contact.dto.ts';
import { ShopLegalDetailsDto } from './shop-legal-details.dto.ts';

export class CreateShopDto implements CreateShopInput {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  name: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ShopLegalDetailsDto)
  legalDetails?: ShopLegalDetailsDto | null;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShopContactDto)
  contacts?: ShopContactDto[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShopAddressDto)
  addresses?: ShopAddressDto[];
}
