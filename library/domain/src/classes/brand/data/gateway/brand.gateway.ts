import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app-v2';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { BrandEntity } from '../../domain/brand.entity.ts';
import { BrandResultEntity } from '../../domain/brand-result.entity.ts';
import { BrandFormDataFactoryInterface } from './factory/brand-form-data-factory.interface.ts';
import { CreateBrandInput } from './input/create-brand.input.ts';
import { UpdateBrandInput } from './input/update-brand.input.ts';
import { BrandDtoMapper } from './mapper/brand-dto.mapper.ts';
import { BrandGatewayInterface } from './brand-gateway.interface.ts';

@Injectable()
export class BrandGateway implements BrandGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
    @Inject(BrandFormDataFactoryInterface) private readonly formDataFactory: BrandFormDataFactoryInterface,
  ) {}

  async update(uuid: string, input: UpdateBrandInput): Promise<BrandEntity> {
    const dto = BrandDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `brand:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid, this.formDataFactory.create(dto));
    });
    return this.toBrand(result);
  }

  async create(input: CreateBrandInput): Promise<BrandEntity> {
    const dto = BrandDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'brand:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/brands', this.formDataFactory.create(dto));
    });
    return this.toBrand(result);
  }

  async findByUuid(uuid: string): Promise<BrandEntity> {
    const result = await this.requestExecutor.run({ scope: `brand:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid);
    });
    return this.toBrand(result);
  }

  async findAll(): Promise<BrandResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'brands:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/brands');
    });
    const entity = plainToInstance(BrandResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toBrand(result: unknown): Promise<BrandEntity> {
    const entity = plainToInstance(BrandEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
