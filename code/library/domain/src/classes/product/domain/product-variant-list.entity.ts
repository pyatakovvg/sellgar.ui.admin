import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsUUID, ValidateNested } from 'class-validator';

import { ProductVariantEntity } from './product-variant.entity.ts';

export class ProductVariantListEntity {
  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsInt()
  version: number;

  @Expose()
  @IsUUID()
  typeUuid: string;

  @Expose()
  @IsInt()
  typeVersion: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantEntity)
  items: ProductVariantEntity[];
}
