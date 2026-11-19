import { Expose, Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { EntityCollection } from '@sellgar/app';

import { CartSummaryEntity } from './cart-summary.entity.ts';
import { CartPageMetaEntity } from './cart-page-meta.entity.ts';

@EntityCollection({ entity: CartSummaryEntity, property: 'data' })
export class CartResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartSummaryEntity)
  data: CartSummaryEntity[];

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => CartPageMetaEntity)
  meta: CartPageMetaEntity;
}
