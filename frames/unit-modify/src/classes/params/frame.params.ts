import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class UnitModifyFrameParams {
  @Expose()
  @IsUUID()
  @IsOptional()
  uuid?: string;
}
