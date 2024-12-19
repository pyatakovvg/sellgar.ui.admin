import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { CategoryEntity, CategoryResultEntity } from '../category.entity.ts';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryGatewayInterface } from './category-gateway.interface.ts';

@injectable()
export class CategoryGateway implements CategoryGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid, updateCategoryDto);
  }

  create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/categories', createCategoryDto);
  }

  findByUuid(uuid: string): Promise<CategoryEntity> {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
  }

  findAll(): Promise<CategoryResultEntity> {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories');
  }
}
