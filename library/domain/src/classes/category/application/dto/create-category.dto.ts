import { Type } from 'class-transformer';
import { IsUUID, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CategoryImageDto {
  @IsString()
  @IsOptional()
  localId?: string;

  @IsUUID()
  @IsOptional()
  imageUuid?: string;

  file?: File;

  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  alt?: string | null;
}

export class CreateCategoryDto {
  @IsUUID()
  @IsOptional()
  parentUuid?: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => CategoryImageDto)
  @IsOptional()
  image?: CategoryImageDto | null;
}
