import { Expose, Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

import type { CreateVariantInput } from '../input/create-variant.input.ts';
import { ProductVariantDto } from './product-variant.dto.ts';

export class CreateVariantDto implements CreateVariantInput {
  @Expose()
  @IsInt()
  @Min(1)
  version: number;

  @Expose()
  @IsInt()
  @Min(1)
  typeVersion: number;

  @Expose()
  @ValidateNested()
  @Type(() => ProductVariantDto)
  variant: ProductVariantDto;
}
