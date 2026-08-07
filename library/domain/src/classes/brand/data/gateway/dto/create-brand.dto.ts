import { Expose, Type } from 'class-transformer';
import { IsInstance, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import type { BrandImageInput, CreateBrandInput } from '../input/create-brand.input.ts';

export class BrandImageDto implements BrandImageInput {
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

export class CreateBrandDto implements CreateBrandInput {
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
  @Type(() => BrandImageDto)
  @IsOptional()
  image?: BrandImageDto | null;
}
