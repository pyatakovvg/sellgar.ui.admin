import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ProductTypeFieldEntity } from './product-type-field.entity.ts';

export class ProductTypeEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsInt()
  version: number;

  @Expose()
  @IsInt()
  activeProductCount: number;

  @Expose()
  @IsInt()
  archivedProductCount: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTypeFieldEntity)
  productFields: ProductTypeFieldEntity[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTypeFieldEntity)
  variantFields: ProductTypeFieldEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
