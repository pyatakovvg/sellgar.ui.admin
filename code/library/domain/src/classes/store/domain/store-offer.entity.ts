import { Expose, Type } from 'class-transformer';
import { Entity } from '@sellgar/app';
import {
  IsArray,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { StoreOfferStatus } from './store-offer-status.enum.ts';

import { StoreVariantSnapshotEntity } from './store-variant-snapshot.entity.ts';

import { StorePriceHistoryEntity } from './store-price-history.entity.ts';

import { StoreAccountingRecordEntity } from './store-accounting-record.entity.ts';

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
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => StoreAccountingRecordEntity)
  records: StoreAccountingRecordEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
