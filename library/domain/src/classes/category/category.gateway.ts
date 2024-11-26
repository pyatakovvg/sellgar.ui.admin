import { inject, injectable } from 'inversify';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { Config, ConfigSymbol } from '../../helpers/Config';
import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const CategoryGatewaySymbol = Symbol.for('CategoryGateway');

@injectable()
export class CategoryGateway {
  constructor(
    @inject(ConfigSymbol) private readonly config: Config,
    @inject(HttpClientSymbol) private readonly httpClient: HttpClient,
  ) {}

  update(uuid: string, dto: UpdateCategoryDto) {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid, {
      ...dto,
    });
  }

  create(dto: CreateCategoryDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/categories', {
      ...dto,
    });
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories');
  }
}
