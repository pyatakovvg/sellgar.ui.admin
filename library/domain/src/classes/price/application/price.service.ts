import { Inject, Injectable } from '@tiyn/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PriceEntity, PriceResultEntity } from '../domain/price.entity.ts';

import { CreatePriceDto } from './dto/create-brand.dto.ts';

import { PriceServiceInterface } from './price-service.interface.ts';
import { PriceGatewayInterface } from '../gateway/price-gateway.interface.ts';

@Injectable()
export class PriceService implements PriceServiceInterface {
  constructor(@Inject(PriceGatewayInterface) private readonly priceGateway: PriceGatewayInterface) {}

  async findAll(storeUuid: string): Promise<PriceResultEntity> {
    const result = await this.priceGateway.findAll(storeUuid);
    const resultInstance = plainToInstance(PriceResultEntity, result, {
      strategy: 'exposeAll',
    });

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(storeUuid: string, dto: CreatePriceDto): Promise<PriceEntity> {
    const result = await this.priceGateway.create(storeUuid, dto);
    const resultInstance = plainToInstance(PriceEntity, result, {
      strategy: 'exposeAll',
    });

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
