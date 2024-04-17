import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { ProductEntity } from './product.entity.ts';

class MetaEntity {
  @IsNumber()
  totalRows: number;
}

export class ResultEntity {
  @ValidateNested()
  @Type(() => ProductEntity)
  data: ProductEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
