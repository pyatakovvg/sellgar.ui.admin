import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';

export abstract class FolderGatewayInterface {
  abstract findByUuid(uuid: string): Promise<any>;
  abstract findAll(filter: GetAllFolderFilterDto): Promise<any>;
}
