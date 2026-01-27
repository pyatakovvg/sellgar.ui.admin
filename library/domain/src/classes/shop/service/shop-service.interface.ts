import { CreateDto } from '../gateway/dto/create.dto.ts';
import { UpdateDto } from '../gateway/dto/update.dto.ts';

import { ShopEntity, ShopResultEntity } from '../shop.entity.ts';

export abstract class ShopServiceInterface {
  abstract findAll(): Promise<ShopResultEntity>;
  abstract findByUuid(uuid: string): Promise<ShopEntity>;
  abstract create(dto: CreateDto): Promise<ShopEntity>;
  abstract update(uuid: string, dto: UpdateDto): Promise<ShopEntity>;
}
