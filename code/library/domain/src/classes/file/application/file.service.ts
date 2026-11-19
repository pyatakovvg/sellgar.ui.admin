import { Inject, Injectable } from '@sellgar/app';

import { FileServiceInterface } from './file-service.interface.ts';
import { FileGatewayInterface } from '../data/gateway/file-gateway.interface.ts';
import { GetAllFileFilterInput } from '../data/gateway/input/get-all-file-filter.input.ts';
import { FileEntity } from '../domain/file.entity.ts';
import { FileResultEntity } from '../domain/file-result.entity.ts';
import { UploadFileEntity } from '../domain/upload-file.entity.ts';

@Injectable()
export class FileService implements FileServiceInterface {
  constructor(@Inject(FileGatewayInterface) private readonly fileGateway: FileGatewayInterface) {}

  findAll(filter: GetAllFileFilterInput): Promise<FileResultEntity> {
    return this.fileGateway.findAll(filter);
  }

  upload(files: UploadFileEntity[], folderUuid?: string): Promise<FileEntity[]> {
    return this.fileGateway.upload(files, folderUuid);
  }

  delete(uuid: string): Promise<FileEntity> {
    return this.fileGateway.delete(uuid);
  }

  download(uuid: string): Promise<Blob> {
    return this.fileGateway.download(uuid);
  }

  getPublicImageUrl(uuid: string): string {
    return this.fileGateway.getPublicImageUrl(uuid);
  }
}
