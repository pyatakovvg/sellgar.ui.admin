import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

import { CurrencyGatewayInterface } from './currency-gateway.interface.ts';

import { CurrencyEntity, CurrencyResultEntity } from '../currency.entity.ts';

@injectable()
export class CurrencyGateway implements CurrencyGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(code: string, dto: UpdateCurrencyDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/currency/' + code, dto);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateCurrencyDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/currency', dto);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async remove(code: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency/' + code);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(code: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency/' + code);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency');
    const resultInstance = plainToInstance(CurrencyResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
