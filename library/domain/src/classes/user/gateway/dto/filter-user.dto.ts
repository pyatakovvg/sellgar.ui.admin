import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? (value instanceof Array ? value : [value]) : undefined))
  roles?: string[];

  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
