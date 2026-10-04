import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { StoreShopStatus } from './store-shop-status.enum.ts';

export class StoreShopSnapshotEntity {
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
  @IsEnum(StoreShopStatus)
  status: StoreShopStatus;

  @Expose()
  @IsDateString()
  syncedAt: string;
}
