import { inject, injectable } from 'inversify';
import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../gateway/store-gateway.interface.ts';

import { AdjustOfferInventoryDto } from '../gateway/dto/adjust-offer-inventory.dto.ts';
import { ArchiveStoreProductDto } from '../gateway/dto/archive-store-product.dto.ts';
import { CreateStoreProductDto } from '../gateway/dto/create-store-product.dto.ts';
import { ReceiptOfferInventoryDto } from '../gateway/dto/receipt-offer-inventory.dto.ts';
import { StoreProductQueryDto } from '../gateway/dto/store-product-query.dto.ts';
import { UpdateStoreProductDto } from '../gateway/dto/update-store-product.dto.ts';
import { WriteOffOfferInventoryDto } from '../gateway/dto/write-off-offer-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

@injectable()
export class StoreService implements StoreServiceInterface {
  constructor(@inject(StoreGatewayInterface) private readonly storeGateway: StoreGatewayInterface) {}

  async findAll(query?: StoreProductQueryDto): Promise<StoreProductResultEntity> {
    return await this.storeGateway.findAll(query);
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    return await this.storeGateway.findByUuid(uuid);
  }

  async update(dto: UpdateStoreProductDto): Promise<StoreProductEntity> {
    await this.validateDto(UpdateStoreProductDto, dto);

    return this.storeGateway.update(dto);
  }

  async create(dto: CreateStoreProductDto): Promise<StoreProductEntity> {
    await this.validateDto(CreateStoreProductDto, dto);

    return await this.storeGateway.create(dto);
  }

  async archive(dto: ArchiveStoreProductDto): Promise<StoreProductEntity> {
    await this.validateDto(ArchiveStoreProductDto, dto);

    return this.storeGateway.archive(dto);
  }

  async receiptInventory(dto: ReceiptOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await this.validateDto(ReceiptOfferInventoryDto, dto);

    return this.storeGateway.receiptInventory(dto);
  }

  async writeOffInventory(dto: WriteOffOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await this.validateDto(WriteOffOfferInventoryDto, dto);

    return this.storeGateway.writeOffInventory(dto);
  }

  async adjustInventory(dto: AdjustOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await this.validateDto(AdjustOfferInventoryDto, dto);

    return this.storeGateway.adjustInventory(dto);
  }

  private async validateDto<T extends object>(dtoClass: ClassConstructor<T>, dto: T): Promise<void> {
    await validateOrReject(plainToInstance(dtoClass, dto));
  }
}
