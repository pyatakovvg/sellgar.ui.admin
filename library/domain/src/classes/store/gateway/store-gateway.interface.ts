import { AdjustOfferInventoryDto } from './dto/adjust-offer-inventory.dto.ts';
import { ArchiveStoreProductDto } from './dto/archive-store-product.dto.ts';
import { CreateStoreProductDto } from './dto/create-store-product.dto.ts';
import { ReceiptOfferInventoryDto } from './dto/receipt-offer-inventory.dto.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';
import { UpdateStoreProductDto } from './dto/update-store-product.dto.ts';
import { WriteOffOfferInventoryDto } from './dto/write-off-offer-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(query?: StoreProductQueryDto): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(dto: CreateStoreProductDto): Promise<StoreProductEntity>;
  abstract update(dto: UpdateStoreProductDto): Promise<StoreProductEntity>;
  abstract archive(dto: ArchiveStoreProductDto): Promise<StoreProductEntity>;
  abstract receiptInventory(dto: ReceiptOfferInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract writeOffInventory(dto: WriteOffOfferInventoryDto): Promise<StoreOfferInventoryEntity>;
  abstract adjustInventory(dto: AdjustOfferInventoryDto): Promise<StoreOfferInventoryEntity>;
}
