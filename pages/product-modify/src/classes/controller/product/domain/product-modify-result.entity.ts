import { Expose, Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';

import { ProductEntity } from '@library/domain';

export class ProductModifyResultEntity {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductEntity)
  product?: ProductEntity;

  @Expose()
  @IsObject()
  imageUrls: Record<string, string>;
}
