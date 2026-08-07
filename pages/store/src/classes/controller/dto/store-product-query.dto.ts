import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import type { StoreProductQueryInput } from '@library/domain';

export class StoreProductQueryDto implements StoreProductQueryInput {
  @Expose()
  @IsOptional()
  @IsString()
  search?: string;
}
