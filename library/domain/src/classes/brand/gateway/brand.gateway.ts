import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { type BrandGatewayInterface } from './brand-gateway.interface.ts';

import { BrandEntity, BrandResultEntity } from '../brand.entity.ts';

@injectable()
export class BrandGateway implements BrandGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, dto: UpdateBrandDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid, dto);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateBrandDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/brands', dto);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands');
    const resultInstance = plainToInstance(BrandResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
