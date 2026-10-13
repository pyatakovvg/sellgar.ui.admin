import { Inject, Injectable } from '@sellgar/app';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../data/gateway/store-gateway.interface.ts';
import { AdjustRecordInventoryInput } from '../data/gateway/input/adjust-record-inventory.input.ts';
import { ArchiveStoreProductInput } from '../data/gateway/input/archive-store-product.input.ts';
import { CreateStoreProductInput } from '../data/gateway/input/create-store-product.input.ts';
import { ReceiptRecordInventoryInput } from '../data/gateway/input/receipt-record-inventory.input.ts';
import { StoreProductQueryInput } from '../data/gateway/input/store-product-query.input.ts';
import { UpdateStoreProductInput } from '../data/gateway/input/update-store-product.input.ts';
import { WriteOffRecordInventoryInput } from '../data/gateway/input/write-off-record-inventory.input.ts';
import { StoreRecordInventoryEntity } from '../domain/store-record-inventory.entity.ts';
import { StoreProductEntity } from '../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../domain/store-product-result.entity.ts';

@Injectable()
export class StoreService implements StoreServiceInterface {
  constructor(@Inject(StoreGatewayInterface) private readonly storeGateway: StoreGatewayInterface) {}

  getAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity> {
    return this.storeGateway.getAll(query);
  }

  findByUuid(uuid: string): Promise<StoreProductEntity> {
    return this.storeGateway.findByUuid(uuid);
  }

  update(input: UpdateStoreProductInput): Promise<StoreProductEntity> {
    return this.storeGateway.update(input);
  }

  create(input: CreateStoreProductInput): Promise<StoreProductEntity> {
    return this.storeGateway.create(input);
  }

  archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity> {
    return this.storeGateway.archive(input);
  }

  receiptInventory(input: ReceiptRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    return this.storeGateway.receiptInventory(input);
  }

  writeOffInventory(input: WriteOffRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    return this.storeGateway.writeOffInventory(input);
  }

  adjustInventory(input: AdjustRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    return this.storeGateway.adjustInventory(input);
  }
}
