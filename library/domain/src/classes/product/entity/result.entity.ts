import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { ProductEntity } from './product.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => ProductEntity)
  data: ProductEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
