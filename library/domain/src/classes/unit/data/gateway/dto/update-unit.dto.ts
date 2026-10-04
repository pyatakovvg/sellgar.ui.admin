import { Expose, Transform } from 'class-transformer';
import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import type { UpdateUnitInput } from '../input/update-unit.input.ts';

export class UpdateUnitDto implements UpdateUnitInput {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  version: number;

  @Expose()
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @Expose()
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  symbol: string;
}
