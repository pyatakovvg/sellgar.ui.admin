import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

import { ShopEntity } from './shop.entity.ts';

export class CompanyEntity {
  @IsString()
  uuid: string;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => ShopEntity)
  shops: ShopEntity[];
}
