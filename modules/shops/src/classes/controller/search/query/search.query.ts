import { Query } from '@sellgar/app';

import { IsOptional, IsString } from 'class-validator';

@Query()
export class SearchQuery {
  @IsOptional()
  @IsString()
  term: string;
}
