import { Expose } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

import type { RemoveCartItemInput } from '../input/remove-cart-item.input.ts';

export class RemoveCartItemDto implements RemoveCartItemInput {
  @Expose()
  @IsString()
  @Matches(/^[1-9]\d*$/)
  version: string;
}
