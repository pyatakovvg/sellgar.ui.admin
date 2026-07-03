import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsEnum, IsNumber } from 'class-validator';

import { MetaEntity } from '../../../meta.entity.ts';
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

export class ShopResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => ShopEntity)
  data: ShopEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
