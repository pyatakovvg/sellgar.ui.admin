import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { PropertyEntity } from '../../domain/property.entity.ts';
import { PropertyResultEntity } from '../../domain/property-result.entity.ts';
import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';
import { CreatePropertyInput } from './input/create-property.input.ts';
import { UpdatePropertyInput } from './input/update-property.input.ts';
import { PropertyGatewayInterface } from './property-gateway.interface.ts';

@Injectable()
export class PropertyGateway implements PropertyGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async update(uuid: string, input: UpdatePropertyInput): Promise<PropertyEntity> {
    const dto = plainToInstance(UpdatePropertyDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `property:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid, dto);
    });
    return this.toProperty(result);
  }

  async create(input: CreatePropertyInput): Promise<PropertyEntity> {
    const dto = plainToInstance(CreatePropertyDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'property:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/properties', dto);
    });
    return this.toProperty(result);
  }

  async findByUuid(uuid: string): Promise<PropertyEntity> {
    const result = await this.requestExecutor.run({ scope: `property:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid);
    });
    return this.toProperty(result);
  }

  async findAll(): Promise<PropertyResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'properties:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/properties');
    });
    const entity = plainToInstance(PropertyResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toProperty(result: unknown): Promise<PropertyEntity> {
    const entity = plainToInstance(PropertyEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
