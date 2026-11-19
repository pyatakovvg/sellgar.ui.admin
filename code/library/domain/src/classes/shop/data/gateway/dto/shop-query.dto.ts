import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import type { ShopQueryInput } from '../input/shop-query.input.ts';

export class ShopQueryDto implements ShopQueryInput {
  @Expose()
  @IsOptional()
  @IsString()
  term?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}
