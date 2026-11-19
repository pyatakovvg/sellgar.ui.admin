import { Expose } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

import type { CartQueryInput } from '../input/cart-query.input.ts';

export class CartQueryDto implements CartQueryInput {
  @Expose()
  @IsOptional()
  @IsUUID()
  shopUuid?: string;

  @Expose()
  @IsOptional()
  @IsUUID()
  ownerUuid?: string;

  @Expose()
  @IsOptional()
  @IsIn(['active', 'closed'])
  status?: 'active' | 'closed';

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
  @Max(Number.MAX_SAFE_INTEGER)
  offset?: number;
}
