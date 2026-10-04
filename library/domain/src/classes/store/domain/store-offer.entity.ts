import { Expose, Type } from 'class-transformer';
import { Entity } from '@sellgar/app';
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

import { StoreOfferStatus } from './store-offer-status.enum.ts';

import { StoreVariantSnapshotEntity } from './store-variant-snapshot.entity.ts';

import { StorePriceHistoryEntity } from './store-price-history.entity.ts';

import { StoreOfferInventoryEntity } from './store-offer-inventory.entity.ts';

import { StoreInventoryMovementEntity } from './store-inventory-movement.entity.ts';

@Entity({ identity: 'uuid' })
export class StoreOfferEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsEnum(StoreOfferStatus)
  status: StoreOfferStatus;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  article?: string | null;

  @Expose()
  @IsUUID()
  storeProductUuid: string;

  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsUUID()
  variantUuid: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StoreVariantSnapshotEntity)
  variantSnapshot?: StoreVariantSnapshotEntity | null;

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => StorePriceHistoryEntity)
  prices: StorePriceHistoryEntity[];

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StorePriceHistoryEntity)
  currentPrice?: StorePriceHistoryEntity | null;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StoreOfferInventoryEntity)
  inventory?: StoreOfferInventoryEntity | null;

  @IsArray()
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StoreInventoryMovementEntity)
  inventoryMovements?: StoreInventoryMovementEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
