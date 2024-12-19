import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';
import { ProductGatewayInterface } from './product-gateway.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductEntity, ProductResultEntity } from '../product.entity.ts';

@injectable()
export class ProductGateway implements ProductGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<ProductResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products');
  }

  async findByUuid(uuid: string): Promise<ProductEntity | null> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products/' + uuid);
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/products', dto);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<ProductEntity> {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/products/' + uuid, dto);
  }
}
