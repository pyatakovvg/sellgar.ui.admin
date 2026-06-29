import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class CategoryModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
