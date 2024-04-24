import { Type } from 'class-transformer';
import { IsString, IsObject, IsArray, ValidateNested } from 'class-validator';

import { PriceEntity } from './price.entity.ts';
import { BrandEntity } from '../../brand/entity/brand.entity.ts';

export class ProductEntity {
  @IsString()
  uuid: string;

  @IsString()
  title: string;

  @IsObject()
  @ValidateNested()
  @Type(() => BrandEntity)
  brand: BrandEntity;

  @IsArray()
  @ValidateNested()
  @Type(() => PriceEntity)
  prices: PriceEntity[];
}
