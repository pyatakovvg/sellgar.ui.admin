import { Expose } from 'class-transformer';
import { IsInstance, IsOptional, IsString, IsUUID } from 'class-validator';

import type { ProductVariantImageInput } from '../input/product-variant-image.input.ts';

export class ProductVariantImageDto implements ProductVariantImageInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  imageUuid?: string;

  @Expose()
  @IsInstance(File)
  @IsOptional()
  file?: File;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;
}
