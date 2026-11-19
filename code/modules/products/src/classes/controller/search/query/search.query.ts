import { Query } from '@sellgar/app';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@Query()
export class SearchQuery {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  term?: string;
}
