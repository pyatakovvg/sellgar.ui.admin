import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { UnitEntity } from '../../domain/unit.entity.ts';
import { UnitResultEntity } from '../../domain/unit-result.entity.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitInput } from './input/create-unit.input.ts';
import { UpdateUnitInput } from './input/update-unit.input.ts';
import { UnitGatewayInterface } from './unit-gateway.interface.ts';

@Injectable()
export class UnitGateway implements UnitGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, input: UpdateUnitInput): Promise<UnitEntity> {
    const dto = plainToInstance(UpdateUnitDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/units/' + uuid, dto);
    return this.toUnit(result);
  }

  async create(input: CreateUnitInput): Promise<UnitEntity> {
    const dto = plainToInstance(CreateUnitDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/units', dto);
    return this.toUnit(result);
  }

  async findByUuid(uuid: string): Promise<UnitEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/units/' + uuid);
    return this.toUnit(result);
  }

  async findAll(): Promise<UnitResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/units');
    const entity = plainToInstance(UnitResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toUnit(result: unknown): Promise<UnitEntity> {
    const entity = plainToInstance(UnitEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
