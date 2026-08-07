import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
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
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, input: UpdatePropertyInput): Promise<PropertyEntity> {
    const dto = plainToInstance(UpdatePropertyDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid, dto);
    return this.toProperty(result);
  }

  async create(input: CreatePropertyInput): Promise<PropertyEntity> {
    const dto = plainToInstance(CreatePropertyDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/properties', dto);
    return this.toProperty(result);
  }

  async findByUuid(uuid: string): Promise<PropertyEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid);
    return this.toProperty(result);
  }

  async findAll(): Promise<PropertyResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties');
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
