import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { EntityCollection } from '@sellgar/app';

import { ProductSummaryEntity } from './product-summary.entity.ts';

@EntityCollection({ entity: ProductSummaryEntity, property: 'items' })
export class ProductResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ProductSummaryEntity)
  items: ProductSummaryEntity[];

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
