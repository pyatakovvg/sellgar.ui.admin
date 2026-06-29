import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class BrandImageDto {
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

export class CreateBrandDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => BrandImageDto)
  @IsOptional()
  image?: BrandImageDto | null;
}
