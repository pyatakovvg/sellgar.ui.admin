import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
import type { CreateVariantInput } from '../input/create-variant.input.ts';

import { ProductVariantDto } from './product-variant.dto.ts';

export class CreateVariantDto implements CreateVariantInput {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUUID()
  categoryUuid: string;

  @Expose()
  @IsUUID()
  brandUuid: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
