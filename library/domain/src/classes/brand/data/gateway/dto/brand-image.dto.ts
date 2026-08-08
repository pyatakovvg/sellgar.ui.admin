import { Expose } from 'class-transformer';
import { IsInstance, IsOptional, IsString, IsUUID } from 'class-validator';

import type { BrandImageInput } from '../input/brand-image.input.ts';

export class BrandImageDto implements BrandImageInput {
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
