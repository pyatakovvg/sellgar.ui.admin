import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class CategoryEntity {
  @IsUUID()
  uuid: string;

  @IsUUID()
  @IsOptional()
  parentUuid?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryEntity)
  parent?: CategoryEntity;

  @ValidateNested()
  @Type(() => CategoryEntity)
  children: CategoryEntity[];

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class CategoryResultEntity {
  @ValidateNested()
  @Type(() => CategoryEntity)
  data: CategoryEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
