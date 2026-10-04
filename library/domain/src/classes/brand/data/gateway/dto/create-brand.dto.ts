import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

import type { CreateBrandInput } from '../input/create-brand.input.ts';
import { BrandImageDto } from './brand-image.dto.ts';

export class CreateBrandDto implements CreateBrandInput {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  code: string;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BrandImageDto)
  @IsOptional()
  images?: BrandImageDto[];
}
