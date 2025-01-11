import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

import { FileGatewayInterface } from './file-gateway.interface.ts';

@injectable()
export class FileGateway implements FileGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  findAll(filter: GetAllFileFilterDto) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files', {
      params: filter,
    });
  }

  upload(formData: FormData) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
