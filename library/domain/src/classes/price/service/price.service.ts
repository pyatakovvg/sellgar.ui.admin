import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PriceEntity, PriceResultEntity } from '../price.entity.ts';

import { CreatePriceDto } from './dto/create-brand.dto.ts';

import { PriceServiceInterface } from './price-service.interface.ts';
import { PriceGatewayInterface } from '../gateway/price-gateway.interface.ts';

@injectable()
export class PriceService implements PriceServiceInterface {
  constructor(@inject(PriceGatewayInterface) private readonly priceGateway: PriceGatewayInterface) {}

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
