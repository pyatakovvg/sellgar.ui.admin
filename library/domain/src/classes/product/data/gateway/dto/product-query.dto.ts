import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

import type { ProductQueryInput } from '../input/product-query.input.ts';

export class ProductQueryDto implements ProductQueryInput {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  term?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}
