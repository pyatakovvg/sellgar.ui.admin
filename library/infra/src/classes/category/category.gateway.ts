import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { injectable, inject } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ResultEntity } from './entity/result.entity.ts';
import { CategoryEntity } from './entity/category.entity.ts';

export const CategoryGatewaySymbol = Symbol.for('CategoryGateway');

@injectable()
export class CategoryGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/categories');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
