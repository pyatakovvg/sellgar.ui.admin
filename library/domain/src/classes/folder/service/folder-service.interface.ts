import { GetAllFolderFilterDto } from '../gateway/dto/get-all-folder-filter.dto.ts';
import { FolderEntity, FolderResultEntity } from '../folder.entity.ts';

export abstract class FolderServiceInterface {
  abstract findAll(filter: GetAllFolderFilterDto): Promise<FolderResultEntity>;
  abstract findByUuid(uuid: string): Promise<FolderEntity>;
}
