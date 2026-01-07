import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { StoreServiceInterface } from './store-service.interface.ts';
import { StoreGatewayInterface } from '../gateway/store-gateway.interface.ts';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

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

  async update(dto: UpdateDto): Promise<StoreEntity> {
    await validateOrReject(dto);

    return this.storeGateway.update(dto);
  }

  async create(dto: CreateDto): Promise<StoreEntity> {
    await validateOrReject(dto);

    return await this.storeGateway.create(dto);
  }
}
