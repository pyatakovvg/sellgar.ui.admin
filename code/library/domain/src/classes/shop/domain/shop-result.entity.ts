import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';

import { ShopEntity } from './shop.entity.ts';

export class ShopPageMetaEntity {
  @Expose()
  @IsInt()
  @Min(0)
  totalRows: number;

  @Expose()
  @IsInt()
  @Min(1)
  limit: number;

  @Expose()
  @IsInt()
  @Min(0)
  offset: number;
}

export class ShopResultEntity {
  @IsArray()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ShopEntity)
  data: ShopEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => ShopPageMetaEntity)
  meta: ShopPageMetaEntity;
}
