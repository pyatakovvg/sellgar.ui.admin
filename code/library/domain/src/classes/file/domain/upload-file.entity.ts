import { Expose } from 'class-transformer';
import { IsInstance } from 'class-validator';

export class UploadFileEntity {
  @Expose()
  @IsInstance(File)
  file: File;
}
