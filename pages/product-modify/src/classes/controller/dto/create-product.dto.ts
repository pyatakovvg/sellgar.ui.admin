import { IsUUID, IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Property {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsUUID()
  propertyUuid: string;

  @IsString()
  value: string;

  @IsNumber()
  order: number;
}

class Variant {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @ValidateNested({ each: true })
  @Type(() => VariantImage)
  @IsOptional()
  images?: VariantImage[];

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => Property)
  properties: Property[];
}

class VariantImage {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsOptional()
  localId?: string;

  @IsUUID()
  @IsOptional()
  imageUuid?: string;

  @IsNumber()
  order: number;

  file?: File;

  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  alt?: string | null;
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
  @Type(() => Property)
  properties: Property[];

  @ValidateNested({ each: true })
  @Type(() => Variant)
  variants: Variant[];
}
