import { Entity } from '@sellgar/app';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ProductFieldEntity } from './product-field.entity.ts';
import { ProductStatus } from './product-status.enum.ts';
import { ProductVariantEntity } from './product-variant.entity.ts';

@Entity({ identity: 'uuid' })
export class ProductEntity {
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
  @Type(() => ProductFieldEntity)
  properties: ProductFieldEntity[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantEntity)
  variants: ProductVariantEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
