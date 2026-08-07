import { GetAllFileFilterInput } from './input/get-all-file-filter.input.ts';

import { FileEntity } from '../../domain/file.entity.ts';
import { FileResultEntity } from '../../domain/file-result.entity.ts';
import { UploadFileEntity } from '../../domain/upload-file.entity.ts';

export abstract class FileGatewayInterface {
  abstract findAll(filter: GetAllFileFilterInput): Promise<FileResultEntity>;
  abstract upload(files: UploadFileEntity[], folderUuid?: string): Promise<FileEntity[]>;
  abstract delete(uuid: string): Promise<FileEntity>;
  abstract download(uuid: string): Promise<Blob>;
  abstract getPublicImageUrl(uuid: string): string;
}
