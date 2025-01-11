import { GetAllFileFilterDto } from '../gateway/dto/get-all-file-filter.dto.ts';

import { FileEntity, FileResultEntity } from '../file.entity.ts';

export abstract class FileServiceInterface {
  abstract findAll(filter: GetAllFileFilterDto): Promise<FileResultEntity>;
  abstract upload(files: FileList, folderUuid?: string): Promise<FileEntity>;
}
