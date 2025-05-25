import { Type, Expose } from 'class-transformer';
import { IsUUID, IsNumber, IsBoolean, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

import { PriceEntity } from '../price';
import { ProductVariantEntity } from '../product-variant';

export class StoreEntity {
  @IsUUID()
  @Expose()
  uuid: string;

  @IsUUID()
  @Expose()
  variantUuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => ProductVariantEntity)
  variant: ProductVariantEntity;

  @Expose()
  @IsNumber()
  count: number;

  @Expose()
  @ValidateNested()
  @Type(() => PriceEntity)
  prices: PriceEntity[];

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
