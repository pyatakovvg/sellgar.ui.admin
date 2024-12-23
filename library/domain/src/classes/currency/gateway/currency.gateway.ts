import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

import { type CurrencyGatewayInterface } from './currency-gateway.interface.ts';

@injectable()
export class CurrencyGateway implements CurrencyGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, dto: UpdateCurrencyDto) {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/currencies/' + uuid, dto);
  }

  create(dto: CreateCurrencyDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/currencies', dto);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currencies/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currencies');
  }
}
