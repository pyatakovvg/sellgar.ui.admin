import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(query: any): Promise<StoreProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreProductEntity>;
  abstract create(dto: CreateDto): Promise<StoreProductEntity>;
  abstract update(dto: UpdateDto): Promise<StoreProductEntity>;
}
