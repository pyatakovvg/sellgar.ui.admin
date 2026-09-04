import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Entity } from '@sellgar/app';

import { StoreProductStatus } from './store-product-status.enum.ts';

import { StoreShopEntity } from './store-shop.entity.ts';

import { StoreProductCatalogEntity } from './store-product-catalog.entity.ts';

import { StoreOfferEntity } from './store-offer.entity.ts';

@Entity({ identity: 'uuid' })
export class StoreProductEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsEnum(StoreProductStatus)
  status: StoreProductStatus;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @IsString()
  article: string;

  @Expose()
  @ValidateNested()
  @Type(() => StoreShopEntity)
  shop: StoreShopEntity;

  @Expose()
  @ValidateNested()
  @Type(() => StoreProductCatalogEntity)
  product: StoreProductCatalogEntity;

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => StoreOfferEntity)
  offers: StoreOfferEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
