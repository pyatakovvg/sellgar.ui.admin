import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';
import { ProductVariantGatewayInterface } from './product-variant-gateway.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductVariantEntity, ProductVariantResultEntity } from '../product-variant.entity.ts';

@injectable()
export class ProductVariantGateway implements ProductVariantGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<ProductVariantResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants');
  }

  async findByUuid(uuid: string): Promise<ProductVariantEntity | null> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid);
  }

  async create(dto: CreateProductDto): Promise<ProductVariantEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/variants', dto);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<ProductVariantEntity> {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid, dto);
  }
}
