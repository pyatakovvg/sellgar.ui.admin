import { inject, injectable } from 'inversify';

import { Config, ConfigSymbol } from '../../helpers/Config';
import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

export const FileGatewaySymbol = Symbol.for('FileGateway');

@injectable()
export class FileGateway {
  constructor(
    @inject(ConfigSymbol) private readonly config: Config,
    @inject(HttpClientSymbol) private readonly httpClient: HttpClient,
  ) {}

  findAll(filter: GetAllFileFilterDto) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files', {
      params: filter,
    });
  }
}
