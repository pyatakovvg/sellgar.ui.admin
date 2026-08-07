import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { VariantStatus } from './variant-status.enum.ts';
import { ProductEntity } from '../../product';

import { VariantPropertyEntity } from './variant-property.entity.ts';

import { VariantImageEntity } from './variant-image.entity.ts';

export class VariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsEnum(VariantStatus)
  status: VariantStatus;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductEntity)
  product?: ProductEntity;

  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => VariantPropertyEntity)
  properties: VariantPropertyEntity[];

  @IsArray()
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantImageEntity)
  images?: VariantImageEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
