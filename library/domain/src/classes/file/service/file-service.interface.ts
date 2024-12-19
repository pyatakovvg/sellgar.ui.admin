import { GetAllFileFilterDto } from '../gateway/dto/get-all-file-filter.dto.ts';

export abstract class FileServiceInterface {
  abstract findAll(filter: GetAllFileFilterDto): Promise<any>;
}
