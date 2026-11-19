import { CreateShopInput } from '../data/gateway/input/create-shop.input.ts';
import { ShopQueryInput } from '../data/gateway/input/shop-query.input.ts';
import { UpdateShopInput } from '../data/gateway/input/update-shop.input.ts';

import { ShopEntity } from '../domain/shop.entity.ts';
import { ShopResultEntity } from '../domain/shop-result.entity.ts';

export abstract class ShopServiceInterface {
  abstract findAll(query?: ShopQueryInput): Promise<ShopResultEntity>;
  abstract findByUuid(uuid: string): Promise<ShopEntity>;
  abstract create(input: CreateShopInput): Promise<ShopEntity>;
  abstract update(uuid: string, input: UpdateShopInput): Promise<ShopEntity>;
}
