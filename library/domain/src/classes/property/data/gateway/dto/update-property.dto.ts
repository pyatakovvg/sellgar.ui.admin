import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import type { UpdatePropertyInput } from '../input/update-property.input.ts';

export class UpdatePropertyDto implements UpdatePropertyInput {
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
}
