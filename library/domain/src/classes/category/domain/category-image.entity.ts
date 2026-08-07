import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ImageEntity } from '../../variant/index.ts';

export class CategoryImageEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  categoryUuid: string;

  @Expose()
  @IsUUID()
  imageUuid: string;

  @Expose()
  @IsNumber()
  sortOrder: number;

  @Expose()
  @IsBoolean()
  isPrimary: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;

  @Expose()
  @ValidateNested()
  @Type(() => ImageEntity)
  image: ImageEntity;
}
