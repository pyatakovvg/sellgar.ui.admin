import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';
import { VariantGatewayInterface } from './variant-gateway.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { VariantEntity, ProductVariantResultEntity } from '../variant.entity.ts';

@injectable()
export class VariantGateway implements VariantGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<ProductVariantResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants');
  }

  async findByUuid(uuid: string): Promise<VariantEntity | null> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid);
  }

  async create(dto: CreateProductDto): Promise<VariantEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/variants', dto);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<VariantEntity> {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid, dto);
  }
}
