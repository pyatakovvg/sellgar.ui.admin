import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString, IsOptional } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';
import { ProductEntity } from '../product';

export class ProductVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  article: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductEntity)
  product: ProductEntity;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class ProductVariantResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => ProductVariantEntity)
  data: ProductVariantEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
