import { Expose, Type } from 'class-transformer';
import { IsInstance, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import type { CategoryImageInput, CreateCategoryInput } from '../input/create-category.input.ts';

export class CategoryImageDto implements CategoryImageInput {
  @Expose()
  @IsString()
  @IsOptional()
  localId?: string;

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
  fileName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;
}

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
