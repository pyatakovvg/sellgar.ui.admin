import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class ShopModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
