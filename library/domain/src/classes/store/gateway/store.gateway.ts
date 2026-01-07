import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

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

  async create(dto: CreateDto): Promise<StoreEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store', dto);
  }

  async update(dto: UpdateDto): Promise<StoreEntity> {
    await validateOrReject(dto);

    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/store', dto);
  }
}
