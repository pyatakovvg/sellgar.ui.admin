import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class PropertyGroupModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
