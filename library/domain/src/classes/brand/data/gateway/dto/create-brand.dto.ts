import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import type { CreateBrandInput } from '../input/create-brand.input.ts';
import { BrandImageDto } from './brand-image.dto.ts';

export class CreateBrandDto implements CreateBrandInput {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => BrandImageDto)
  @IsOptional()
  image?: BrandImageDto | null;
}
