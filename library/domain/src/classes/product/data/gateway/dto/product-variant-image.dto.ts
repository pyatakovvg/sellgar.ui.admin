import { Expose } from 'class-transformer';
import { IsInstance, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

import type { ProductVariantImageInput } from '../input/product-variant-image.input.ts';

export class ProductVariantImageDto implements ProductVariantImageInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  imageUuid?: string;

  @Expose()
  @IsInstance(File)
  @IsOptional()
  file?: File;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
