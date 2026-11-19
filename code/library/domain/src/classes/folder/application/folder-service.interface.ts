import { GetAllFolderFilterInput } from '../data/gateway/input/get-all-folder-filter.input.ts';
import { FolderEntity } from '../domain/folder.entity.ts';
import { FolderResultEntity } from '../domain/folder-result.entity.ts';

export abstract class FolderServiceInterface {
  abstract findAll(filter: GetAllFolderFilterInput): Promise<FolderResultEntity>;
  abstract findByUuid(uuid: string): Promise<FolderEntity>;
}
