import { AdjustInventoryDto } from './dto/adjust-inventory.dto.ts';
import { CreateDto } from './dto/create.dto.ts';
import { ReceiptInventoryDto } from './dto/receipt-inventory.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';
import { WriteOffInventoryDto } from './dto/write-off-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(query: any): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(dto: CreateDto): Promise<StoreProductEntity>;
  abstract update(dto: UpdateDto): Promise<StoreProductEntity>;
  abstract receiptInventory(dto: ReceiptInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract writeOffInventory(dto: WriteOffInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract adjustInventory(dto: AdjustInventoryDto): Promise<StoreOfferInventoryEntity>;
}
