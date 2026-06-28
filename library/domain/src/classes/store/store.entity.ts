import { Type, Expose } from 'class-transformer';
import {
  IsUUID,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsDateString,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { CurrencyEntity } from '../currency/currency.entity.ts';

export enum StoreProductStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  ARCHIVED = 'archived',
}

export enum StoreOfferStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  ARCHIVED = 'archived',
}

export class ShopSnapshotEntity {
  @Expose()
  @IsUUID()
  shopUuid: string;

  @Expose()
  @IsNumber()
  sourceVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  status: string;

  @Expose()
  @IsDateString()
  syncedAt: string;
}

export class ProductSnapshotEntity {
  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsNumber()
  sourceVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  status: string;

  @Expose()
  @IsDateString()
  syncedAt: string;
}

export class VariantSnapshotEntity {
  @Expose()
  @IsUUID()
  variantUuid: string;

  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsNumber()
  sourceVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  status: string;

  @Expose()
  @IsDateString()
  syncedAt: string;
}

export class StorePriceHistoryEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @Expose()
  @IsUUID()
  offerUuid: string;

  @Expose()
  @IsString()
  value: string;

  @Expose()
  @IsString()
  currencyCode: string;

  @Expose()
  @ValidateNested()
  @Type(() => CurrencyEntity)
  currency: CurrencyEntity;

  @Expose()
  @IsDateString()
  startsAt: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  endsAt?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  reason?: string | null;

  @Expose()
  @IsDateString()
  createdAt: string;
}

export class StoreOfferInventoryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  offerUuid: string;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsNumber()
  reserved: number;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreInventoryMovementEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  offerUuid: string;

  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsNumber()
  quantityDelta: number;

  @Expose()
  @IsNumber()
  reservedDelta: number;

  @Expose()
  @IsString()
  sourceType: string;

  @Expose()
  @IsOptional()
  @IsUUID()
  sourceUuid?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  reason?: string | null;

  @Expose()
  @IsOptional()
  @IsUUID()
  createdBy?: string | null;

  @Expose()
  @IsDateString()
  createdAt: string;
}

export class StoreOfferEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @IsUUID()
  @Expose()
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
  @Type(() => VariantSnapshotEntity)
  variantSnapshot?: VariantSnapshotEntity | null;

  @Expose()
  @IsOptional()
  @IsString()
  sku?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  article?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  titleOverride?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  descriptionOverride?: string | null;

  @Expose()
  @IsEnum(StoreOfferStatus)
  status: StoreOfferStatus;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @ValidateNested()
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

export class StoreProductEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsUUID()
  shopUuid: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ShopSnapshotEntity)
  shopSnapshot?: ShopSnapshotEntity | null;

  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSnapshotEntity)
  productSnapshot?: ProductSnapshotEntity | null;

  @Expose()
  @IsString()
  article: string;

  @Expose()
  @IsOptional()
  @IsString()
  titleOverride?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  descriptionOverride?: string | null;

  @Expose()
  @IsEnum(StoreProductStatus)
  status: StoreProductStatus;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @ValidateNested()
  @Type(() => StoreOfferEntity)
  offers: StoreOfferEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreProductResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => StoreProductEntity)
  data: StoreProductEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
