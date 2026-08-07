import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { PriceEntity } from '../../domain/price.entity.ts';
import { PriceResultEntity } from '../../domain/price-result.entity.ts';
import { CreatePriceDto } from './dto/create-price.dto.ts';
import { CreatePriceInput } from './input/create-price.input.ts';
import { PriceGatewayInterface } from './price-gateway.interface.ts';

@Injectable()
export class PriceGateway implements PriceGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(storeUuid: string): Promise<PriceResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices');
    const entity = plainToInstance(PriceResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async create(storeUuid: string, input: CreatePriceInput): Promise<PriceEntity> {
    const dto = plainToInstance(CreatePriceDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices',
      dto,
    );
    const entity = plainToInstance(PriceEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
