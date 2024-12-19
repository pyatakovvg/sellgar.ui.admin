import { inject, injectable } from 'inversify';

import { GetAllFileFilterDto } from '../gateway/dto/get-all-file-filter.dto.ts';

import { FileServiceInterface } from './file-service.interface.ts';
import { FileGatewayInterface } from '../gateway/file-gateway.interface.ts';

@injectable()
export class FileService implements FileServiceInterface {
  constructor(@inject(FileGatewayInterface) private readonly fileGateway: FileGatewayInterface) {}

  findAll(filter: GetAllFileFilterDto) {
    return this.fileGateway.findAll(filter);
  }
}
