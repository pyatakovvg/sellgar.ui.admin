import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';

import { FolderGatewayInterface } from './folder-gateway.interface.ts';

@injectable()
export class FolderGateway implements FolderGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
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
