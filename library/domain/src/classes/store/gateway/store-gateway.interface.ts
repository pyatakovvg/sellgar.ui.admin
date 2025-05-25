import { CreateProductStoreDto } from './dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from './dto/update-product-store.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

export abstract class StoreGatewayInterface {
  abstract findAll(): Promise<StoreResultEntity>;
  abstract findByUuid(uuid: string): Promise<StoreEntity>;
  abstract create(dto: CreateProductStoreDto): Promise<StoreEntity>;
  abstract update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity>;
}
