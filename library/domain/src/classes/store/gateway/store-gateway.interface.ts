import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(): Promise<StoreResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreEntity>;
  abstract create(dto: CreateDto): Promise<StoreEntity>;
  abstract update(dto: UpdateDto): Promise<StoreEntity>;
}
