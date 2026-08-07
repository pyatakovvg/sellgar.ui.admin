import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsString, IsUUID } from 'class-validator';

import { StoreShopStatus } from './store-shop-status.enum.ts';

export class StoreShopEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(StoreShopStatus)
  status: StoreShopStatus;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
