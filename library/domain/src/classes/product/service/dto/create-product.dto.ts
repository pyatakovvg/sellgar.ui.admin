import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductVariantDto {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsString()
  article: string;

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
