import { inject, injectable } from 'inversify';

import { FolderGateway, FolderGatewaySymbol } from './folder.gateway.ts';

import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';

export const FolderServiceSymbol = Symbol.for('FolderService');

@injectable()
export class FolderService {
  constructor(@inject(FolderGatewaySymbol) private readonly folderGateway: FolderGateway) {}

  findAll(filter: GetAllFolderFilterDto) {
    return this.folderGateway.findAll(filter);
  }

  findByUuid(uuid: string) {
    return this.folderGateway.findByUuid(uuid);
  }
}
