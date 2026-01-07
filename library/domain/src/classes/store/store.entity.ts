import { Type, Expose } from 'class-transformer';
import { IsUUID, IsNumber, IsBoolean, ValidateNested, IsDateString, IsString } from 'class-validator';

import { PriceEntity } from '../price';
import { VariantEntity } from '../variant';

import { MetaEntity } from '../../meta.entity.ts';

export class StoreEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @IsString()
  @Expose()
  article: string;

  @IsUUID()
  @Expose()
  variantUuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => VariantEntity)
  variant: VariantEntity;

  @Expose()
  @IsNumber()
  count: number;

  @Expose()
  @ValidateNested()
  @Type(() => PriceEntity)
  prices: PriceEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => PriceEntity)
  currentPrice: PriceEntity;

  @Expose()
  @IsBoolean()
  showing: boolean = false;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class StoreResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => StoreEntity)
  data: StoreEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
