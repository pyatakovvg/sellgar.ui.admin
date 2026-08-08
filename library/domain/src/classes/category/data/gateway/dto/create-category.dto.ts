import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import type { CreateCategoryInput } from '../input/create-category.input.ts';
import { CategoryImageDto } from './category-image.dto.ts';

export class CreateCategoryDto implements CreateCategoryInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  parentUuid?: string | null;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => CategoryImageDto)
  @IsOptional()
  image?: CategoryImageDto | null;
}
