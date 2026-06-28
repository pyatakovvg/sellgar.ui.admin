import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../gateway/store-gateway.interface.ts';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

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
}
