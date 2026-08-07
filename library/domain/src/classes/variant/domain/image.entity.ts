import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class ImageEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  fileName: string;
}
