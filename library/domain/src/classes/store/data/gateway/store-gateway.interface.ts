import { AdjustRecordInventoryInput } from './input/adjust-record-inventory.input.ts';
import { ArchiveStoreProductInput } from './input/archive-store-product.input.ts';
import { CreateStoreProductInput } from './input/create-store-product.input.ts';
import { ReceiptRecordInventoryInput } from './input/receipt-record-inventory.input.ts';
import { StoreProductQueryInput } from './input/store-product-query.input.ts';
import { UpdateStoreProductInput } from './input/update-store-product.input.ts';
import { WriteOffRecordInventoryInput } from './input/write-off-record-inventory.input.ts';

import { StoreRecordInventoryEntity } from '../../domain/store-record-inventory.entity.ts';
import { StoreProductEntity } from '../../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../../domain/store-product-result.entity.ts';

export abstract class StoreGatewayInterface {
  abstract getAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(input: CreateStoreProductInput): Promise<StoreProductEntity>;
  abstract update(input: UpdateStoreProductInput): Promise<StoreProductEntity>;
  abstract archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity>;
  abstract receiptInventory(input: ReceiptRecordInventoryInput): Promise<StoreRecordInventoryEntity>;
  abstract writeOffInventory(input: WriteOffRecordInventoryInput): Promise<StoreRecordInventoryEntity>;
  abstract adjustInventory(input: AdjustRecordInventoryInput): Promise<StoreRecordInventoryEntity>;
}
