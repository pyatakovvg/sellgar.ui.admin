import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { StoreCatalogStatus } from './store-catalog-status.enum.ts';

export class StoreVariantSnapshotEntity {
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
  @IsEnum(StoreCatalogStatus)
  status: StoreCatalogStatus;

  @Expose()
  @IsDateString()
  syncedAt: string;
}
