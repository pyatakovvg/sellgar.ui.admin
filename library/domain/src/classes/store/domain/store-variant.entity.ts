import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { VariantImageEntity, VariantPropertyEntity } from '../../variant/index.ts';
import { StoreCatalogStatus } from './store-catalog-status.enum.ts';

export class StoreVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(StoreCatalogStatus)
  status: StoreCatalogStatus;

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
