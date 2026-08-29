import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app-v2';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { CategoryEntity } from '../../domain/category.entity.ts';
import { CategoryResultEntity } from '../../domain/category-result.entity.ts';
import { CategoryFormDataFactoryInterface } from './factory/category-form-data-factory.interface.ts';
import { CreateCategoryInput } from './input/create-category.input.ts';
import { UpdateCategoryInput } from './input/update-category.input.ts';
import { CategoryDtoMapper } from './mapper/category-dto.mapper.ts';
import { CategoryGatewayInterface } from './category-gateway.interface.ts';

@Injectable()
export class CategoryGateway implements CategoryGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
    @Inject(CategoryFormDataFactoryInterface) private readonly formDataFactory: CategoryFormDataFactoryInterface,
  ) {}

  async update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity> {
    const dto = CategoryDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `category:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid, this.formDataFactory.create(dto));
    });
    return this.toCategory(result);
  }

  async create(input: CreateCategoryInput): Promise<CategoryEntity> {
    const dto = CategoryDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'category:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/categories', this.formDataFactory.create(dto));
    });
    return this.toCategory(result);
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    const result = await this.requestExecutor.run({ scope: `category:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
    });
    return this.toCategory(result);
  }

  async findAll(): Promise<CategoryResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'categories:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/categories');
    });
    const entity = plainToInstance(CategoryResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toCategory(result: unknown): Promise<CategoryEntity> {
    const entity = plainToInstance(CategoryEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
