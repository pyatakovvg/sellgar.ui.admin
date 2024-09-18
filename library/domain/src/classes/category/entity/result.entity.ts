import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { CategoryEntity } from './category.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
