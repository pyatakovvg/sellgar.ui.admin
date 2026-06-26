import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductVariantImageDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;

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

class ProductVariantDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @ValidateNested({ each: true })
  @Type(() => ProductVariantImageDto)
  @IsOptional()
  images?: ProductVariantImageDto[];

  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  categoryUuid: string;

  @IsUUID()
  brandUuid: string;

  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
