import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { PropertyEntity } from '../../property';

export class ProductPropertyEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyEntity)
  property: PropertyEntity;

  @Expose()
  @IsUUID()
  propertyUuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  optionUuid?: string | null;

  @Expose()
  @IsString()
  value: string;

  @Expose()
  @IsNumber()
  order: number;
}
