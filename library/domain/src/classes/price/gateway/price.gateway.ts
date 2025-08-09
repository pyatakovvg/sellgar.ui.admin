import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { PriceGatewayInterface } from './price-gateway.interface.ts';

import { PriceEntity, PriceResultEntity } from '../price.entity.ts';

import { CreatePriceDto } from './dto/create-price.dto.ts';

@injectable()
export class PriceGateway implements PriceGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  findAll(uuid: string): Promise<PriceResultEntity> {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/' + uuid + '/prices');
  }

  create(uuid: string, dto: CreatePriceDto): Promise<PriceEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store/' + uuid + '/prices', dto);
  }
}
