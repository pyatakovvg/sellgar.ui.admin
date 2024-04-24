import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { CategoryEntity } from './category.entity.ts';

class MetaEntity {
  @IsNumber()
  totalRows: number;
}

export class ResultEntity {
  @ValidateNested()
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
