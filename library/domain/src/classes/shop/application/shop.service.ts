import { Inject, Injectable } from '@sellgar/app';

import { ShopServiceInterface } from './shop-service.interface.ts';
import { ShopGatewayInterface } from '../data/gateway/shop-gateway.interface.ts';
import { CreateShopInput } from '../data/gateway/input/create-shop.input.ts';
import { ShopQueryInput } from '../data/gateway/input/shop-query.input.ts';
import { UpdateShopInput } from '../data/gateway/input/update-shop.input.ts';
import { ShopEntity } from '../domain/shop.entity.ts';
import { ShopResultEntity } from '../domain/shop-result.entity.ts';

@Injectable()
export class ShopService implements ShopServiceInterface {
  constructor(@Inject(ShopGatewayInterface) private readonly shopGateway: ShopGatewayInterface) {}

  findAll(query?: ShopQueryInput): Promise<ShopResultEntity> {
    return this.shopGateway.findAll(query);
  }

  findByUuid(uuid: string): Promise<ShopEntity> {
    return this.shopGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateShopInput): Promise<ShopEntity> {
    return this.shopGateway.update(uuid, input);
  }

  create(input: CreateShopInput): Promise<ShopEntity> {
    return this.shopGateway.create(input);
  }

}
