import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { EntityCollection } from '@sellgar/app';

import { MetaEntity } from '../../meta/index.ts';

import { StoreProductEntity } from './store-product.entity.ts';

@EntityCollection({ entity: StoreProductEntity, property: 'data' })
export class StoreProductResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => StoreProductEntity)
  data: StoreProductEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
