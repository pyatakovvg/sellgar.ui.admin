import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

import { CurrencyServiceInterface } from './currency-service.interface.ts';
import { CurrencyGatewayInterface } from '../gateway/currency-gateway.interface.ts';

import { CurrencyEntity, CurrencyResultEntity } from '../currency.entity.ts';

@injectable()
export class CurrencyService implements CurrencyServiceInterface {
  constructor(@inject(CurrencyGatewayInterface) private readonly brandGateway: CurrencyGatewayInterface) {}

  async findAll(): Promise<CurrencyResultEntity> {
    return await this.brandGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<CurrencyEntity> {
    return await this.brandGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateCurrencyDto): Promise<CurrencyEntity> {
    const dtoInstance = plainToInstance(UpdateCurrencyDto, dto);

    await validateOrReject(dtoInstance);

    return await this.brandGateway.update(uuid, dto);
  }

  async create(dto: CreateCurrencyDto): Promise<CurrencyEntity> {
    const dtoInstance = plainToInstance(CreateCurrencyDto, dto);

    await validateOrReject(dtoInstance);

    return await this.brandGateway.create(dto);
  }
}
