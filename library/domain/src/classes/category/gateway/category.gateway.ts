import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryGatewayInterface } from './category-gateway.interface.ts';

import { CategoryEntity, CategoryResultEntity } from '../category.entity.ts';

@injectable()
export class CategoryGateway implements CategoryGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/categories/' + uuid,
      updateCategoryDto,
    );
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/categories', createCategoryDto);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll(): Promise<CategoryResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories');
    const resultInstance = plainToInstance(CategoryResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
