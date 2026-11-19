import { Expose } from 'class-transformer';
import { IsInstance, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

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
  @IsInt()
  @Min(0)
  @Max(2147483647)
  @IsOptional()
  sortOrder?: number;
}
