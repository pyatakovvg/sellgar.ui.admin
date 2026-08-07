import { Expose, Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { CurrencyEntity } from '../../currency/index.ts';

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
