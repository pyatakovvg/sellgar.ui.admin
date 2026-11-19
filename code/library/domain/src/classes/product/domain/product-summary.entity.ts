import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Entity } from '@sellgar/app';

import { ProductStatus } from './product-status.enum.ts';
import { ProductSummaryVariantEntity } from './product-summary-variant.entity.ts';

@Entity({ identity: 'uuid' })
export class ProductSummaryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  typeUuid: string;

  @Expose()
  @IsInt()
  typeVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsString()
  brandCode: string;

  @Expose()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Expose()
  @IsInt()
  version: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSummaryVariantEntity)
  variants: ProductSummaryVariantEntity[];
}
