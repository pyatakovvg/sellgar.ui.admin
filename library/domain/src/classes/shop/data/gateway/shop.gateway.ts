import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { ShopEntity } from '../../domain/shop.entity.ts';
import { ShopResultEntity } from '../../domain/shop-result.entity.ts';
import { CreateShopDto } from './dto/create-shop.dto.ts';
import { UpdateShopDto } from './dto/update-shop.dto.ts';
import { CreateShopInput } from './input/create-shop.input.ts';
import { UpdateShopInput } from './input/update-shop.input.ts';
import { ShopGatewayInterface } from './shop-gateway.interface.ts';

@Injectable()
export class ShopGateway implements ShopGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<ShopResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/shops');
    const entity = plainToInstance(ShopResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findByUuid(uuid: string): Promise<ShopEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid);
    return this.toShop(result);
  }

  async create(input: CreateShopInput): Promise<ShopEntity> {
    const dto = plainToInstance(CreateShopDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/shops', dto);
    return this.toShop(result);
  }

  async update(uuid: string, input: UpdateShopInput): Promise<ShopEntity> {
    const dto = plainToInstance(UpdateShopDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid, dto);
    return this.toShop(result);
  }

  private async toShop(result: unknown): Promise<ShopEntity> {
    const entity = plainToInstance(ShopEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
