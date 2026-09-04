import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { EntityCollection } from '@sellgar/app';

import { MetaEntity } from '../../meta/index.ts';

import { ProductEntity } from './product.entity.ts';

@EntityCollection({ entity: ProductEntity, property: 'data' })
export class ProductResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ProductEntity)
  data: ProductEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
