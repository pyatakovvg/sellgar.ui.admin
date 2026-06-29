import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class BrandModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
