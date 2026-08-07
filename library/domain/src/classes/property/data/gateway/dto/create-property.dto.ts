import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import type {
  CreatePropertyInput,
  PropertyOptionInput,
  PropertyOptionMetadataInput,
} from '../input/create-property.input.ts';

export class PropertyOptionMetadataDto implements PropertyOptionMetadataInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsString()
  valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';

  @Expose()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @Expose()
  @IsString()
  @IsOptional()
  textValue?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  colorValue?: string | null;

  @Expose()
  @IsUUID()
  @IsOptional()
  fileUuid?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  iconCode?: string | null;
}

export class PropertyOptionDto implements PropertyOptionInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionMetadataDto)
  @IsArray()
  @IsOptional()
  metadata?: PropertyOptionMetadataDto[];
}

export class CreatePropertyDto implements CreatePropertyInput {
  @Expose()
  @IsUUID()
  @IsOptional()
  unitUuid?: string | null;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'OPTION' | 'DATE';

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PropertyOptionDto)
  @IsArray()
  @IsOptional()
  options?: PropertyOptionDto[];
}
