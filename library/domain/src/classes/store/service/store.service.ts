import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../gateway/store-gateway.interface.ts';

import { AdjustInventoryDto } from '../gateway/dto/adjust-inventory.dto.ts';
import { CreateDto } from './dto/create.dto.ts';
import { ReceiptInventoryDto } from '../gateway/dto/receipt-inventory.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';
import { WriteOffInventoryDto } from '../gateway/dto/write-off-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

@injectable()
export class StoreService implements StoreServiceInterface {
  constructor(@inject(StoreGatewayInterface) private readonly storeGateway: StoreGatewayInterface) {}

  async findAll(query: any): Promise<StoreProductResultEntity> {
    return await this.storeGateway.findAll(query);
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    return await this.storeGateway.findByUuid(uuid);
  }

  async update(dto: UpdateDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.storeGateway.update(dto);
  }

  async create(dto: CreateDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return await this.storeGateway.create(dto);
  }

  async receiptInventory(dto: ReceiptInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.storeGateway.receiptInventory(dto);
  }

  async writeOffInventory(dto: WriteOffInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.storeGateway.writeOffInventory(dto);
  }

  async adjustInventory(dto: AdjustInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.storeGateway.adjustInventory(dto);
  }
}
