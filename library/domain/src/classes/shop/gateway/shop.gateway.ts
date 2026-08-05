import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { ShopGatewayInterface } from './shop-gateway.interface.ts';

import { ShopEntity, ShopResultEntity } from '../domain/shop.entity.ts';

@Injectable()
export class ShopGateway implements ShopGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/shops');
    const resultInstance = plainToInstance(ShopResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid);
    const resultInstance = plainToInstance(ShopEntity, result, {
      strategy: 'excludeAll',
    });

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/shops', dto);
    const resultInstance = plainToInstance(ShopEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, dto: UpdateDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid, dto);
    const resultInstance = plainToInstance(ShopEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
