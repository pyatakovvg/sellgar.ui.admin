import { IsString, IsUUID } from 'class-validator';

export class FileEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
