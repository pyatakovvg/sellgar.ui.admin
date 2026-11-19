import { Expose, Type } from 'class-transformer';
import { IsDefined, IsInt, Min, ValidateNested } from 'class-validator';
import { Entity } from '@sellgar/app';

import { CartMetadataEntity } from './cart-metadata.entity.ts';
import { CartShopEntity } from './cart-shop.entity.ts';

@Entity({ identity: 'uuid' })
export class CartSummaryEntity extends CartMetadataEntity {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => CartShopEntity)
  shop: CartShopEntity;

  /** Число отдельных позиций корзины, без суммирования quantity. */
  @Expose()
  @IsInt()
  @Min(0)
  itemsCount: number;
}
