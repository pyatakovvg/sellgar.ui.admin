import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @Expose()
  @IsOptional()
  @IsString()
  search?: string;
}
