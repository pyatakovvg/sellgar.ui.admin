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

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => Property)
  properties: Property[];
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

  @ValidateNested()
  @Type(() => Variant)
  variants: Variant[];
}
