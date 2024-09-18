import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { ShopEntity } from './shop.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => ShopEntity)
  data: ShopEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
