import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ProductFieldEntity, ProductVariantEntity } from '@library/domain';

export class VariantModifyResultEntity {
  @Expose()
  @IsUUID()
  productUuid: string;
  @Expose()
  @IsInt()
  version: number;
  @Expose()
  @IsInt()
  typeVersion: number;
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductVariantEntity)
  variant?: ProductVariantEntity;
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductFieldEntity)
  fields: ProductFieldEntity[];
  @Expose()
  @IsObject()
  imageUrls: Record<string, string>;
}
