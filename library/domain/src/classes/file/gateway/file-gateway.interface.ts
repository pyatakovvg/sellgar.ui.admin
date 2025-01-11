import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

export abstract class FileGatewayInterface {
  abstract findAll(filter: GetAllFileFilterDto): Promise<any>;
  abstract upload(formData: FormData): Promise<any>;
}
