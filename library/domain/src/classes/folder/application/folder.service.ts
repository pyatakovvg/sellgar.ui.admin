import { Inject, Injectable } from '@tiyn/app';

import { GetAllFolderFilterDto } from '../gateway/dto/get-all-folder-filter.dto.ts';

import { FolderServiceInterface } from './folder-service.interface.ts';
import { FolderGatewayInterface } from '../gateway/folder-gateway.interface.ts';

@Injectable()
export class FolderService implements FolderServiceInterface {
  constructor(@Inject(FolderGatewayInterface) private readonly folderGateway: FolderGatewayInterface) {}

  findAll(filter: GetAllFolderFilterDto) {
    return this.folderGateway.findAll(filter);
  }

  findByUuid(uuid: string) {
    return this.folderGateway.findByUuid(uuid);
  }
}
