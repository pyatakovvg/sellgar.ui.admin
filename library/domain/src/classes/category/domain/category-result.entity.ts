import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta';

import { CategoryEntity } from './category.entity.ts';

export class CategoryResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
