import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, ValidateNested } from 'class-validator';

import { PropertyEntity } from '../../property';

export class ProductTypeFieldEntity {
  @Expose()
  @IsString()
  propertyCode: string;

  @Expose()
  @IsBoolean()
  required: boolean;

  @Expose()
  @IsBoolean()
  multiple: boolean;

  @Expose()
  @IsInt()
  sortOrder: number;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyEntity)
  property: PropertyEntity;
}
