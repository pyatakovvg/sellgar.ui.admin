import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { ProductTypeEntity } from '../../domain/product-type.entity.ts';
import { ProductTypeResultEntity } from '../../domain/product-type-result.entity.ts';
import { ProductTypeGatewayInterface } from './product-type-gateway.interface.ts';
import type { CreateProductTypeInput } from './input/create-product-type.input.ts';
import type { UpdateProductTypeInput } from './input/update-product-type.input.ts';
import { ProductTypeDtoMapper } from './mapper/product-type-dto.mapper.ts';

@Injectable()
export class ProductTypeGateway implements ProductTypeGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async findAll(): Promise<ProductTypeResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'product-types:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/product-types');
    });
    const entity = plainToInstance(ProductTypeResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findByUuid(uuid: string): Promise<ProductTypeEntity> {
    const result = await this.requestExecutor.run({ scope: `product-type:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/product-types/' + uuid);
    });
    const entity = plainToInstance(ProductTypeEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async create(input: CreateProductTypeInput): Promise<ProductTypeEntity> {
    const dto = ProductTypeDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'product-type:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/product-types', dto);
    });
    return this.toEntity(result);
  }

  async update(uuid: string, input: UpdateProductTypeInput): Promise<ProductTypeEntity> {
    const dto = ProductTypeDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `product-type:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/product-types/' + uuid, dto);
    });
    return this.toEntity(result);
  }

  private async toEntity(value: unknown): Promise<ProductTypeEntity> {
    const entity = plainToInstance(ProductTypeEntity, value);
    await validateOrReject(entity);
    return entity;
  }
}
