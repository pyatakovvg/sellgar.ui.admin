import { Expose } from 'class-transformer';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import type { CreateUnitInput } from '../input/create-unit.input.ts';

export class CreateUnitDto implements CreateUnitInput {
  @Expose()
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  code: string;

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
