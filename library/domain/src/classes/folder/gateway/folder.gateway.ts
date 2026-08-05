import { Inject, Injectable } from '@sellgar/app';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';

import { FolderGatewayInterface } from './folder-gateway.interface.ts';

@Injectable()
export class FolderGateway implements FolderGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
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
