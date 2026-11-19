import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { isUUID, validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client';
import { CategoryEntity } from '../../domain/category.entity.ts';
import { CategoryTreeEntity } from '../../domain/category-tree.entity.ts';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';
import type { CreateCategoryInput } from './input/create-category.input.ts';
import type { UpdateCategoryInput } from './input/update-category.input.ts';
import { CategoryGatewayInterface } from './category-gateway.interface.ts';

@Injectable()
export class CategoryGateway implements CategoryGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async getTree(shopUuid: string): Promise<CategoryTreeEntity> {
    if (!isUUID(shopUuid)) throw new Error('Invalid shop UUID');
    const result = await this.requestExecutor.run({ scope: `categories:tree:${shopUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/store/categories/tree', { params: { shopUuid } });
    });
    const tree = plainToInstance(CategoryTreeEntity, result, { excludeExtraneousValues: true });
    await validateOrReject(tree);
    return tree;
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    if (!isUUID(uuid)) throw new Error('Invalid category UUID');
    const result = await this.requestExecutor.run({ scope: `category:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/store/categories/' + uuid);
    });
    return this.toCategory(result);
  }

  async create(input: CreateCategoryInput): Promise<CategoryEntity> {
    const dto = plainToInstance(CreateCategoryDto, input, { excludeExtraneousValues: true });
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'category:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/store/categories', dto);
    });
    return this.toCategory(result);
  }

  async update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity> {
    const dto = plainToInstance(UpdateCategoryDto, input, { excludeExtraneousValues: true });
    await validateOrReject(dto);
    if (uuid !== dto.uuid) throw new Error('Category UUID does not match');
    const result = await this.requestExecutor.run({ scope: `category:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/store/categories/' + uuid, dto);
    });
    return this.toCategory(result);
  }

  private async toCategory(result: unknown): Promise<CategoryEntity> {
    const category = plainToInstance(CategoryEntity, result, { excludeExtraneousValues: true });
    await validateOrReject(category);
    return category;
  }
}
