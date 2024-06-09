import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { ResultEntity } from './entity/result.entity.ts';
import { BucketEntity } from './entity/bucket.entity.ts';

export const BucketGatewaySymbols = Symbol.for('BucketGateway');

@injectable()
export class BucketGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/buckets');
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async getByUuid(uuid: string): Promise<BucketEntity> {
    const result = this.httpClient.get<BucketEntity>(import.meta.env.VITE_GATEWAY_API + '/buckets/' + uuid);
    const resultInstance = plainToInstance(BucketEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async remove(bucketName: string) {
    return await this.httpClient.delete(import.meta.env.VITE_GATEWAY_API + '/buckets/' + bucketName);
  }
}
