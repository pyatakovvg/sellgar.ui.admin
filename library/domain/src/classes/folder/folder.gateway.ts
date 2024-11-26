import { inject, injectable } from 'inversify';

import { Config, ConfigSymbol } from '../../helpers/Config';
import { HttpClient, HttpClientSymbol } from '../../helpers/HttpClient';

import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';

export const FolderGatewaySymbol = Symbol.for('FolderGateway');

@injectable()
export class FolderGateway {
  constructor(
    @inject(ConfigSymbol) private readonly config: Config,
    @inject(HttpClientSymbol) private readonly httpClient: HttpClient,
  ) {}

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/folders/' + uuid);
  }

  findAll(filter: GetAllFolderFilterDto) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/folders', {
      params: filter,
    });
  }
}
