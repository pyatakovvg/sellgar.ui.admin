import { Expose, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import type { FilterUserInput } from '../input/filter-user.input.ts';

export class FilterUserDto implements FilterUserInput {
  @Expose()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? (value instanceof Array ? value : [value]) : undefined))
  roles?: string[];

  @Expose()
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
