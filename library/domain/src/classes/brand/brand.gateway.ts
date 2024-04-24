import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { injectable, inject } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ResultEntity } from './entity/result.entity.ts';
import { BrandEntity } from './entity/brand.entity.ts';

export const BrandGatewaySymbol = Symbol.for('BrandGateway');

@injectable()
export class BrandGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/brands');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
