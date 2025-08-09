import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

import { FileGatewayInterface } from './file-gateway.interface.ts';

import { FileResultEntity } from '../file.entity.ts';

@injectable()
export class FileGateway implements FileGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(filter: GetAllFileFilterDto) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files', {
      params: filter,
    });
    const resultInstance = plainToInstance(FileResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  upload(formData: FormData) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
