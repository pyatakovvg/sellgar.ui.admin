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

  upload(files: FileList, folderUuid?: string) {
    const formData = new FormData();

    if (folderUuid) {
      formData.append('folderUuid', folderUuid);
    }

    for (let key in files) {
      const fileList = files[key] as unknown as File[];
      for (let index in fileList) {
        formData.append(`files`, fileList[index]);
      }
    }

    return this.fileGateway.upload(formData);
  }
}
