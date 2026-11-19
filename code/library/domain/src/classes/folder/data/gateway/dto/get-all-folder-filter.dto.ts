import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import type { GetAllFolderFilterInput } from '../input/get-all-folder-filter.input.ts';

export class GetAllFolderFilterDto implements GetAllFolderFilterInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  parentUuid?: string;
}
