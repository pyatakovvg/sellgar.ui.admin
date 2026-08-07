import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import type { CreateShopInput } from '../input/create-shop.input.ts';

export class CreateShopDto implements CreateShopInput {
  @Expose()
  @IsString()
  name: string;
}
