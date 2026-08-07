import { CreateShopInput } from './input/create-shop.input.ts';
import { UpdateShopInput } from './input/update-shop.input.ts';

import { ShopEntity } from '../../domain/shop.entity.ts';
import { ShopResultEntity } from '../../domain/shop-result.entity.ts';

export abstract class ShopGatewayInterface {
  abstract findAll(): Promise<ShopResultEntity>;
  abstract findByUuid(uuid: string): Promise<ShopEntity>;
  abstract create(input: CreateShopInput): Promise<ShopEntity>;
  abstract update(uuid: string, input: UpdateShopInput): Promise<ShopEntity>;
}
