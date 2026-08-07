import { AdjustOfferInventoryInput } from './input/adjust-offer-inventory.input.ts';
import { ArchiveStoreProductInput } from './input/archive-store-product.input.ts';
import { CreateStoreProductInput } from './input/create-store-product.input.ts';
import { ReceiptOfferInventoryInput } from './input/receipt-offer-inventory.input.ts';
import { StoreProductQueryInput } from './input/store-product-query.input.ts';
import { UpdateStoreProductInput } from './input/update-store-product.input.ts';
import { WriteOffOfferInventoryInput } from './input/write-off-offer-inventory.input.ts';

import { StoreOfferInventoryEntity } from '../../domain/store-offer-inventory.entity.ts';
import { StoreProductEntity } from '../../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../../domain/store-product-result.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(input: CreateStoreProductInput): Promise<StoreProductEntity>;
  abstract update(input: UpdateStoreProductInput): Promise<StoreProductEntity>;
  abstract archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity>;
  abstract receiptInventory(input: ReceiptOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
  abstract writeOffInventory(input: WriteOffOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
  abstract adjustInventory(input: AdjustOfferInventoryInput): Promise<StoreOfferInventoryEntity>;
}
