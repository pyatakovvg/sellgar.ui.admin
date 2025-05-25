import { inject, injectable } from 'inversify';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../gateway/store-gateway.interface.ts';

import { CreateProductStoreDto } from '../gateway/dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from '../gateway/dto/update-product-store.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

@injectable()
export class StoreService implements StoreServiceInterface {
  constructor(@inject(StoreGatewayInterface) private readonly storeGateway: StoreGatewayInterface) {}

  async findAll(): Promise<StoreResultEntity> {
    return await this.storeGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<StoreEntity> {
    return await this.storeGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity> {
    return this.storeGateway.update(uuid, dto);
  }

  async create(dto: CreateProductStoreDto): Promise<StoreEntity> {
    return await this.storeGateway.create(dto);
  }
}
