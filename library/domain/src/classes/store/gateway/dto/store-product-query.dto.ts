import { IsOptional, IsString } from 'class-validator';

export class StoreProductQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
