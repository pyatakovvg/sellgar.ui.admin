import { Inject, Injectable } from '@sellgar/app';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../data/gateway/store-gateway.interface.ts';
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

@Injectable()
export class StoreService implements StoreServiceInterface {
  constructor(@Inject(StoreGatewayInterface) private readonly storeGateway: StoreGatewayInterface) {}

  findAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity> {
    return this.storeGateway.findAll(query);
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

  receiptInventory(input: ReceiptOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    return this.storeGateway.receiptInventory(input);
  }

  writeOffInventory(input: WriteOffOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    return this.storeGateway.writeOffInventory(input);
  }

  adjustInventory(input: AdjustOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    return this.storeGateway.adjustInventory(input);
  }
}
