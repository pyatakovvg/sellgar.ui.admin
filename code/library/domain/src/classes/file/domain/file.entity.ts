import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class FileEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  storageKey?: string;

  @Expose()
  @IsString()
  mime: string;

  @Expose()
  @IsNumber()
  size: number;

  @Expose()
  @IsString()
  @IsOptional()
  status?: string;

  @Expose()
  @IsDateString()
  @IsOptional()
  expiresAt?: string | null;

  @Expose()
  @IsUUID()
  @IsOptional()
  folderUuid?: string | null;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
