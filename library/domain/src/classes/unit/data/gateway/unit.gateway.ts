import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app-v2';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
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
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async update(uuid: string, input: UpdateUnitInput): Promise<UnitEntity> {
    const dto = plainToInstance(UpdateUnitDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `unit:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/units/' + uuid, dto);
    });
    return this.toUnit(result);
  }

  async create(input: CreateUnitInput): Promise<UnitEntity> {
    const dto = plainToInstance(CreateUnitDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'unit:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/units', dto);
    });
    return this.toUnit(result);
  }

  async findByUuid(uuid: string): Promise<UnitEntity> {
    const result = await this.requestExecutor.run({ scope: `unit:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/units/' + uuid);
    });
    return this.toUnit(result);
  }

  async findAll(): Promise<UnitResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'units:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/units');
    });
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
