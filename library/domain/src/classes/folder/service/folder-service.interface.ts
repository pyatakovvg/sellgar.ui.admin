import { GetAllFolderFilterDto } from '../gateway/dto/get-all-folder-filter.dto.ts';

export abstract class FolderServiceInterface {
  abstract findAll(filter: GetAllFolderFilterDto): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
}
