import { AdjustOfferInventoryInput } from '../data/gateway/input/adjust-offer-inventory.input.ts';
import { ArchiveStoreProductInput } from '../data/gateway/input/archive-store-product.input.ts';
import { CreateStoreProductInput } from '../data/gateway/input/create-store-product.input.ts';
import { ReceiptOfferInventoryInput } from '../data/gateway/input/receipt-offer-inventory.input.ts';
import { StoreProductQueryInput } from '../data/gateway/input/store-product-query.input.ts';
import { UpdateStoreProductInput } from '../data/gateway/input/update-store-product.input.ts';
import { WriteOffOfferInventoryInput } from '../data/gateway/input/write-off-offer-inventory.input.ts';

import { StoreOfferInventoryEntity } from '../domain/store-offer-inventory.entity.ts';
import { StoreProductEntity } from '../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../domain/store-product-result.entity.ts';

export abstract class StoreServiceInterface {
  abstract findAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(input: CreateStoreProductInput): Promise<StoreProductEntity>;
  abstract update(input: UpdateStoreProductInput): Promise<StoreProductEntity>;
  abstract archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity>;
  abstract receiptInventory(input: ReceiptOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
  abstract writeOffInventory(input: WriteOffOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
  abstract adjustInventory(input: AdjustOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
}
