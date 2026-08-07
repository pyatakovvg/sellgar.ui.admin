import { Inject, Injectable } from '@sellgar/app';

import { FolderServiceInterface } from './folder-service.interface.ts';
import { FolderGatewayInterface } from '../data/gateway/folder-gateway.interface.ts';
import { GetAllFolderFilterInput } from '../data/gateway/input/get-all-folder-filter.input.ts';
import { FolderEntity } from '../domain/folder.entity.ts';
import { FolderResultEntity } from '../domain/folder-result.entity.ts';

@Injectable()
export class FolderService implements FolderServiceInterface {
  constructor(@Inject(FolderGatewayInterface) private readonly folderGateway: FolderGatewayInterface) {}

  findAll(filter: GetAllFolderFilterInput): Promise<FolderResultEntity> {
    return this.folderGateway.findAll(filter);
  }

  findByUuid(uuid: string): Promise<FolderEntity> {
    return this.folderGateway.findByUuid(uuid);
  }
}
