import { inject, injectable } from 'inversify';

import { FileGateway, FileGatewaySymbol } from './file.gateway.ts';

import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

export const FileServiceSymbol = Symbol.for('FileService');

@injectable()
export class FileService {
  constructor(@inject(FileGatewaySymbol) private readonly fileGateway: FileGateway) {}

  findAll(filter: GetAllFileFilterDto) {
    return this.fileGateway.findAll(filter);
  }
}
