import { CreateDto } from '../gateway/dto/create.dto.ts';
import { UpdateDto } from '../gateway/dto/update.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

export abstract class StoreServiceInterface {
  abstract findAll(): Promise<StoreResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreEntity>;
  abstract create(dto: CreateDto): Promise<StoreEntity>;
  abstract update(dto: UpdateDto): Promise<StoreEntity>;
}
