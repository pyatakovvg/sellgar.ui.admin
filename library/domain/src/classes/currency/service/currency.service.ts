import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CurrencyEntity, CurrencyResultEntity } from '../currency.entity.ts';

import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

import { CurrencyServiceInterface } from './currency-service.interface.ts';
import { CurrencyGatewayInterface } from '../gateway/currency-gateway.interface.ts';

@injectable()
export class CurrencyService implements CurrencyServiceInterface {
  constructor(@inject(CurrencyGatewayInterface) private readonly brandGateway: CurrencyGatewayInterface) {}

  async findAll(): Promise<CurrencyResultEntity> {
    const result = await this.brandGateway.findAll();
    const resultInstance = plainToInstance(CurrencyResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<CurrencyEntity> {
    const result = await this.brandGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, dto: UpdateCurrencyDto): Promise<CurrencyEntity> {
    const result = await this.brandGateway.update(uuid, dto);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateCurrencyDto): Promise<CurrencyEntity> {
    const result = await this.brandGateway.create(dto);
    const resultInstance = plainToInstance(CurrencyEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
