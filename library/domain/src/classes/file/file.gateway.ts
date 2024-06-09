import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { ResultEntity } from './entity/result.entity.ts';

export const FileGatewaySymbols = Symbol.for('FileGateway');

@injectable()
export class FileGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getAll(bucketName: string): Promise<ResultEntity> {
    const result = await this.httpClient.get<ResultEntity>(import.meta.env.VITE_GATEWAY_API + '/files/' + bucketName);
    const resultInstance = plainToInstance(ResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async remove(bucketName: string, fileName: string) {
    return await this.httpClient.get<ResultEntity>(
      import.meta.env.VITE_GATEWAY_API + '/files/' + bucketName + '/' + fileName,
    );
  }
}
