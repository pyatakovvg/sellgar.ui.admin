import { Query } from '@sellgar/app';

import { IsOptional, IsString } from 'class-validator';

@Query()
export class FilterQuery {
  @IsOptional()
  @IsString()
  term: string;
}
