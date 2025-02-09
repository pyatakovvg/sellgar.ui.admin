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

  upload(files: File[], folderUuid?: string) {
    const formData = new FormData();

    if (folderUuid) {
      formData.append('folderUuid', folderUuid);
    }

    for (let index in files) {
      const file = files[index];
      formData.append(`files`, file);
    }

    return this.fileGateway.upload(formData);
  }
}
