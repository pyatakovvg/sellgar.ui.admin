import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

import { ProductTypeEntity } from './product-type.entity.ts';

export class ProductTypeResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTypeEntity)
  items: ProductTypeEntity[];

  @Expose()
  @IsInt()
  total: number;

  @Expose()
  @IsInt()
  limit: number;

  @Expose()
  @IsInt()
  offset: number;
}
