import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { GetAllFileFilterDto } from '../gateway/dto/get-all-file-filter.dto.ts';

import { FileServiceInterface } from './file-service.interface.ts';
import { FileGatewayInterface } from '../gateway/file-gateway.interface.ts';

@Injectable()
export class FileService implements FileServiceInterface {
  constructor(@Inject(FileGatewayInterface) private readonly fileGateway: FileGatewayInterface) {}

  async findAll(filter: GetAllFileFilterDto) {
    const filterInstance = plainToInstance(GetAllFileFilterDto, filter);

    await validateOrReject(filterInstance);

    return await this.fileGateway.findAll(filter);
  }

  async upload(files: File[], folderUuid?: string) {
    return await this.fileGateway.upload(files, folderUuid);
  }

  async delete(uuid: string) {
    return await this.fileGateway.delete(uuid);
  }

  async download(uuid: string) {
    return await this.fileGateway.download(uuid);
  }

  getPublicImageUrl(uuid: string) {
    return this.fileGateway.getPublicImageUrl(uuid);
  }
}
