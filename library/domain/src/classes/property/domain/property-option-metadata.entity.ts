import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class PropertyOptionMetadataEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsUUID()
  optionUuid: string;

  @Expose()
  @IsString()
  valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';

  @Expose()
  @IsNumber()
  sortOrder: number;

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

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
