import { AdjustInventoryDto } from '../gateway/dto/adjust-inventory.dto.ts';
import { CreateDto } from '../gateway/dto/create.dto.ts';
import { ReceiptInventoryDto } from '../gateway/dto/receipt-inventory.dto.ts';
import { UpdateDto } from '../gateway/dto/update.dto.ts';
import { WriteOffInventoryDto } from '../gateway/dto/write-off-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

export abstract class StoreServiceInterface {
  abstract findAll(query: any): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(dto: CreateDto): Promise<StoreProductEntity>;
  abstract update(dto: UpdateDto): Promise<StoreProductEntity>;
  abstract receiptInventory(dto: ReceiptInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract writeOffInventory(dto: WriteOffInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract adjustInventory(dto: AdjustInventoryDto): Promise<StoreOfferInventoryEntity>;
}
