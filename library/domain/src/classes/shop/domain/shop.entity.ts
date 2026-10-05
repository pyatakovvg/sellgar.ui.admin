import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

import { ShopAddressEntity } from './shop-address.entity.ts';
import { ShopContactEntity } from './shop-contact.entity.ts';
import { ShopLegalDetailsEntity } from './shop-legal-details.entity.ts';

export class ShopEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsInt()
  @Min(1)
  version: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ShopLegalDetailsEntity)
  legalDetails: ShopLegalDetailsEntity | null;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShopContactEntity)
  contacts: ShopContactEntity[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShopAddressEntity)
  addresses: ShopAddressEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
