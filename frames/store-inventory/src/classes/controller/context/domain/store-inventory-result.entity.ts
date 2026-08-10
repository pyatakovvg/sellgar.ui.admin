import { StoreOfferEntity, StoreProductEntity } from '@library/domain';

import { Expose, Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export class StoreInventoryResultEntity {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => StoreProductEntity)
  storeProduct: StoreProductEntity;

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => StoreOfferEntity)
  offer: StoreOfferEntity;
}
