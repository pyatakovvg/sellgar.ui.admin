import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import type { ProductPropertyInput } from '../input/product-property.input.ts';

export class ProductPropertyDto implements ProductPropertyInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

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
}
