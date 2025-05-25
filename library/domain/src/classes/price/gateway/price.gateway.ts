import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';
import { type PriceGatewayInterface } from './price-gateway.interface.ts';

import { PriceEntity, PriceResultEntity } from '../price.entity.ts';

import { CreatePriceDto } from './dto/create-price.dto.ts';

@injectable()
export class PriceGateway implements PriceGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  findAll(storeUuid: string): Promise<PriceResultEntity> {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices');
  }

  create(storeUuid: string, dto: CreatePriceDto): Promise<PriceEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices', dto);
  }
}
