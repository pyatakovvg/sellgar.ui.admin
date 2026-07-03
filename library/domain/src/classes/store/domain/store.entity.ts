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

import { MetaEntity } from '../../../meta.entity.ts';
import { CatalogStatus } from '../../catalog-status.enum.ts';
import { CurrencyEntity } from '../../currency/domain/currency.entity.ts';
import { ShopStatus } from '../../shop/domain/shop-status.enum.ts';
import { VariantImageEntity, VariantPropertyEntity } from '../../variant/domain/variant.entity.ts';

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

export class StoreShopEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(ShopStatus)
  status: ShopStatus;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreBrandEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreCategoryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreProductCatalogEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(CatalogStatus)
  status: CatalogStatus;

  @Expose()
  @ValidateNested()
  @Type(() => StoreBrandEntity)
  brand: StoreBrandEntity;

  @Expose()
  @ValidateNested()
  @Type(() => StoreCategoryEntity)
  category: StoreCategoryEntity;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(CatalogStatus)
  status: CatalogStatus;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => VariantPropertyEntity)
  properties: VariantPropertyEntity[];

  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantImageEntity)
  images: VariantImageEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StorePriceHistoryEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @Expose()
  @IsString()
  value: string;

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
  @IsNumber()
  quantity: number;

  @Expose()
  @IsNumber()
  reserved: number;

  @Expose()
  @IsNumber()
  available: number;

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
  @ValidateNested()
  @Type(() => StoreVariantEntity)
  variant: StoreVariantEntity;

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

export class StoreProductResultEntity {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => StoreProductEntity)
  data: StoreProductEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
