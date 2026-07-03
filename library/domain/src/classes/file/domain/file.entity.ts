import { MetaEntity } from '../../../meta.entity.ts';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class FileEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  storageKey?: string;

  @IsString()
  mime: string;

  @IsNumber()
  size: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  expiresAt?: string | null;

  @IsUUID()
  @IsOptional()
  folderUuid?: string | null;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class FileResultEntity {
  data: FileEntity[];

  meta: MetaEntity;
}
