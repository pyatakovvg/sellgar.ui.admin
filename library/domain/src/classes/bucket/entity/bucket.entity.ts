import { IsString, IsUUID } from 'class-validator';

export class BucketEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  bucketName: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
