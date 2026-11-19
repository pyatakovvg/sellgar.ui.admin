import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import type { GetAllFileFilterInput } from '../input/get-all-file-filter.input.ts';

export class GetAllFileFilterDto implements GetAllFileFilterInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  folderUuid?: string;
}
