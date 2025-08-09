import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { GetAllFileFilterDto } from '../gateway/dto/get-all-file-filter.dto.ts';

import { FileServiceInterface } from './file-service.interface.ts';
import { FileGatewayInterface } from '../gateway/file-gateway.interface.ts';

@injectable()
export class FileService implements FileServiceInterface {
  constructor(@inject(FileGatewayInterface) private readonly fileGateway: FileGatewayInterface) {}

  async findAll(filter: GetAllFileFilterDto) {
    const filterInstance = plainToInstance(GetAllFileFilterDto, filter);

    await validateOrReject(filterInstance);

    return await this.fileGateway.findAll(filter);
  }

  async upload(files: File[], folderUuid?: string) {
    const formData = new FormData();

    if (folderUuid) {
      formData.append('folderUuid', folderUuid);
    }

    for (let index in files) {
      const file = files[index];
      formData.append(`files`, file);
    }

    return await this.fileGateway.upload(formData);
  }
}
