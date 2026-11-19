import { EntityCollection } from '@sellgar/app';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

import { PropertyEntity } from './property.entity.ts';

@EntityCollection({ entity: PropertyEntity, property: 'items' })
export class PropertyResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyEntity)
  items: PropertyEntity[];

  @Expose()
  @IsInt()
  total: number;

  @Expose()
  @IsInt()
  limit: number;

  @Expose()
  @IsInt()
  offset: number;
}
