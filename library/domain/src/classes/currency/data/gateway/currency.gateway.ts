import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { CurrencyEntity } from '../../domain/currency.entity.ts';
import { CurrencyResultEntity } from '../../domain/currency-result.entity.ts';
import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';
import { CreateCurrencyInput } from './input/create-currency.input.ts';
import { UpdateCurrencyInput } from './input/update-currency.input.ts';
import { CurrencyGatewayInterface } from './currency-gateway.interface.ts';

@Injectable()
export class CurrencyGateway implements CurrencyGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(code: string, input: UpdateCurrencyInput): Promise<CurrencyEntity> {
    const dto = plainToInstance(UpdateCurrencyDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/currency/' + code, dto);
    return this.toCurrency(result);
  }

  async create(input: CreateCurrencyInput): Promise<CurrencyEntity> {
    const dto = plainToInstance(CreateCurrencyDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/currency', dto);
    return this.toCurrency(result);
  }

  async remove(code: string): Promise<CurrencyEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency/' + code);
    return this.toCurrency(result);
  }

  async findByUuid(code: string): Promise<CurrencyEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency/' + code);
    return this.toCurrency(result);
  }

  async findAll(): Promise<CurrencyResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/currency');
    const entity = plainToInstance(CurrencyResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toCurrency(result: unknown): Promise<CurrencyEntity> {
    const entity = plainToInstance(CurrencyEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
