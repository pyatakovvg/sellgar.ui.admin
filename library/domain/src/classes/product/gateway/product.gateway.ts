import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductGatewayInterface } from './product-gateway.interface.ts';

import { ProductEntity, ProductResultEntity } from '../product.entity.ts';

@injectable()
export class ProductGateway implements ProductGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products');
    const resultInstance = plainToInstance(ProductResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products/' + uuid);
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateProductDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/products', dto);
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, dto: UpdateProductDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/products/' + uuid, dto);
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
