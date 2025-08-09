import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductVariantDto {
  @IsString()
  article: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}

class ProductPropertyDto {
  @IsUUID()
  propertyUuid: string;

  @IsString()
  value: string;
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

  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties: ProductPropertyDto[];
}
