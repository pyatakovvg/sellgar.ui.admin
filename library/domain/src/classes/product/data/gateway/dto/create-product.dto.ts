import { Expose, Type } from 'class-transformer';
import { IsArray, IsInstance, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import type {
  CreateProductInput,
  ProductPropertyInput,
  ProductVariantImageInput,
  ProductVariantInput,
} from '../input/create-product.input.ts';

class ProductPropertyDto implements ProductPropertyInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsUUID()
  propertyUuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  optionUuid?: string | null;

  @Expose()
  @IsString()
  value: string;
}

class ProductVariantImageDto implements ProductVariantImageInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

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

class ProductVariantDto implements ProductVariantInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantImageDto)
  @IsOptional()
  images?: ProductVariantImageDto[];

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties: ProductPropertyDto[];
}

export class CreateProductDto implements CreateProductInput {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUUID()
  categoryUuid: string;

  @Expose()
  @IsUUID()
  brandUuid: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  @IsOptional()
  properties?: ProductPropertyDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];
}
