import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { ShopEntity, ShopResultEntity } from '../shop.entity.ts';

export abstract class ShopGatewayInterface {
  abstract findAll(): Promise<ShopResultEntity>;
  abstract findByUuid(uuid: string): Promise<ShopEntity>;
  abstract create(dto: CreateDto): Promise<ShopEntity>;
  abstract update(uuid: string, dto: UpdateDto): Promise<ShopEntity>;
}
