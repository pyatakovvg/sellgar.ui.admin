import { Type, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class CategoryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  parentUuid?: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryEntity)
  parent?: CategoryEntity;

  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  children: CategoryEntity[];

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class CategoryResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
