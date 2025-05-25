import { CreateProductStoreDto } from '../gateway/dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from '../gateway/dto/update-product-store.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

export abstract class StoreServiceInterface {
  abstract findAll(): Promise<StoreResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreEntity>;
  abstract create(dto: CreateProductStoreDto): Promise<StoreEntity>;
  abstract update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity>;
}
