import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { CreateProductStoreDto } from './dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from './dto/update-product-store.dto.ts';

import { StoreEntity, StoreResultEntity } from '../store.entity.ts';

import { StoreGatewayInterface } from './store-gateway.interface.ts';

@injectable()
export class StoreGateway implements StoreGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<StoreResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store');
  }

  async findByUuid(uuid: string): Promise<StoreEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/' + uuid);
  }

  async create(dto: CreateProductStoreDto): Promise<StoreEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store', dto);
  }

  async update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity> {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/store/' + uuid, dto);
  }
}
