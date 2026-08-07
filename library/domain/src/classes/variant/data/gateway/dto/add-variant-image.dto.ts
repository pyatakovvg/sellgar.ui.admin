import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import type { AddVariantImageInput } from '../input/add-variant-image.input.ts';

export class AddVariantImageDto implements AddVariantImageInput {
  @Expose()
  @IsUUID()
  imageUuid: string;

  @Expose()
  @IsString()
  @IsOptional()
  fileName?: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  order?: number;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;
}
