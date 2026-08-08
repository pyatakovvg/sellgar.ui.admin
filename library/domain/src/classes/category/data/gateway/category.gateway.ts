import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
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
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
    @Inject(CategoryFormDataFactoryInterface) private readonly formDataFactory: CategoryFormDataFactoryInterface,
  ) {}

  async update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity> {
    const dto = CategoryDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/categories/' + uuid,
      this.formDataFactory.create(dto),
    );
    return this.toCategory(result);
  }

  async create(input: CreateCategoryInput): Promise<CategoryEntity> {
    const dto = CategoryDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/categories',
      this.formDataFactory.create(dto),
    );
    return this.toCategory(result);
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
    return this.toCategory(result);
  }

  async findAll(): Promise<CategoryResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories');
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
