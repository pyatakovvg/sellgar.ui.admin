import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { ShopStatus } from './shop-status.enum.ts';

export class ShopEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

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
