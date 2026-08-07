import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { ImageEntity } from './image.entity.ts';

export class VariantImageEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  imageUuid: string;

  @Expose()
  @ValidateNested()
  @Type(() => ImageEntity)
  image: ImageEntity;

  @Expose()
  @IsNumber()
  order: number;

  @Expose()
  @IsString()
  @IsOptional()
  alt?: string | null;
}
