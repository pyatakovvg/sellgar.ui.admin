import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import type { UpdateShopInput } from '../input/update-shop.input.ts';
import { CreateShopDto } from './create-shop.dto.ts';

export class UpdateShopDto extends CreateShopDto implements UpdateShopInput {
  @Expose()
  @IsUUID()
  uuid: string;
}
