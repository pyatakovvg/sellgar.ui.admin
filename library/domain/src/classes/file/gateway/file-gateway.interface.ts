import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

import { FileEntity, FileResultEntity } from '../file.entity.ts';

export abstract class FileGatewayInterface {
  abstract findAll(filter: GetAllFileFilterDto): Promise<FileResultEntity>;
  abstract upload(files: File[], folderUuid?: string): Promise<FileEntity[]>;
  abstract delete(uuid: string): Promise<FileEntity>;
  abstract download(uuid: string): Promise<Blob>;
  abstract getPublicImageUrl(uuid: string): string;
}
