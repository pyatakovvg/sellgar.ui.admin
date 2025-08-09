import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

import { FileResultEntity } from '../file.entity.ts';

export abstract class FileGatewayInterface {
  abstract findAll(filter: GetAllFileFilterDto): Promise<FileResultEntity>;
  abstract upload(formData: FormData): Promise<any>;
}
