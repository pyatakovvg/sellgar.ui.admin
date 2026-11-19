import { Query } from '@sellgar/app';
import { IsOptional, IsUUID } from 'class-validator';

@Query()
export class CategoryQuery {
  @IsOptional()
  @IsUUID()
  shopUuid?: string;
}
