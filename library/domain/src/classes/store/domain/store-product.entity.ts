import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Entity } from '@sellgar/app';

import { StoreProductStatus } from './store-product-status.enum.ts';

import { StoreShopSnapshotEntity } from './store-shop-snapshot.entity.ts';

import { StoreProductSnapshotEntity } from './store-product-snapshot.entity.ts';

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
  @IsUUID()
  shopUuid: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StoreShopSnapshotEntity)
  shopSnapshot?: StoreShopSnapshotEntity | null;

  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StoreProductSnapshotEntity)
  productSnapshot?: StoreProductSnapshotEntity | null;

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
