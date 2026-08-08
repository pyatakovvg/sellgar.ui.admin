import { Expose } from 'class-transformer';
import { IsInstance, IsOptional, IsString, IsUUID } from 'class-validator';

import type { CategoryImageInput } from '../input/category-image.input.ts';

export class CategoryImageDto implements CategoryImageInput {
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
