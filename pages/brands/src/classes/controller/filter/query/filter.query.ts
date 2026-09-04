import { Query } from '@sellgar/app';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

@Query()
export class FilterQuery {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  search: string;
}
