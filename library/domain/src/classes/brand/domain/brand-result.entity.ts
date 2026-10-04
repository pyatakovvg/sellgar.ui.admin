import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

import { BrandEntity } from './brand.entity.ts';

export class BrandResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BrandEntity)
  items: BrandEntity[];

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
