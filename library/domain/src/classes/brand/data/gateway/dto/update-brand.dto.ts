import { Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import type { UpdateBrandInput } from '../input/update-brand.input.ts';

import { BrandImageDto } from './brand-image.dto.ts';

export class UpdateBrandDto implements UpdateBrandInput {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  version: number;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string | null;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BrandImageDto)
  images?: BrandImageDto[];
}
