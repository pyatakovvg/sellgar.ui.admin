import { Query } from '@sellgar/app-v2';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

@Query()
export class FilterQuery {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  search: string;
}
