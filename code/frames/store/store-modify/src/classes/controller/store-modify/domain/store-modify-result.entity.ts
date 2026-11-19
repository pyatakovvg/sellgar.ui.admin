import type { ProductEntity, StoreProductEntity } from '@library/domain';

export class StoreModifyResultEntity {
  constructor(
    readonly storeProduct: StoreProductEntity,
    readonly product: ProductEntity,
  ) {}
}
