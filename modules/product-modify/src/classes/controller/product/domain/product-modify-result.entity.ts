import { Expose, Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';

import { ProductEntity, ProductTypeResultEntity } from '@library/domain';

export class ProductModifyResultEntity {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductEntity)
  product?: ProductEntity;

  @Expose()
  @ValidateNested()
  @Type(() => ProductTypeResultEntity)
  productTypes: ProductTypeResultEntity;

  @Expose()
  @IsObject()
  imageUrls: Record<string, string>;
}
