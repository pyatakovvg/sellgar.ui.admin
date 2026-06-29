import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class StoreModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
