import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import type { UpdateShopInput } from '../input/update-shop.input.ts';
import { ShopAddressDto } from './shop-address.dto.ts';
import { ShopContactDto } from './shop-contact.dto.ts';
import { ShopLegalDetailsDto } from './shop-legal-details.dto.ts';

export class UpdateShopDto implements UpdateShopInput {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  version: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  name?: string;

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
