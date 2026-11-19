import { GetAllFolderFilterInput } from './input/get-all-folder-filter.input.ts';
import { FolderEntity } from '../../domain/folder.entity.ts';
import { FolderResultEntity } from '../../domain/folder-result.entity.ts';

export abstract class FolderGatewayInterface {
  abstract findByUuid(uuid: string): Promise<FolderEntity>;
  abstract findAll(filter: GetAllFolderFilterInput): Promise<FolderResultEntity>;
}
