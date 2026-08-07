import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import type { ProductVariantInput } from '../input/create-variant.input.ts';

export class ProductVariantDto implements ProductVariantInput {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;
}
