import { injectable, inject } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ResultEntity } from './entity/result.entity.ts';
import { ProductEntity } from './entity/product.entity.ts';
import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

export const ProductGatewaySymbol = Symbol.for('ProductGateway');

@injectable()
export class ProductGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/products');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async getByUuid(uuid: string): Promise<ProductEntity> {
    const result = await this.httpClient.get<ProductEntity>(import.meta.env.VITE_GATEWAY_API + '/products/' + uuid);
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  update(uuid: string, body: any) {
    return this.httpClient.put(import.meta.env.VITE_GATEWAY_API + '/products/' + uuid, body);
  }

  create(body: any) {
    return this.httpClient.post(import.meta.env.VITE_GATEWAY_API + '/products', body);
  }
}
