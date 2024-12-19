import { Type } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class BrandEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export class BrandResultEntity {
  @ValidateNested()
  @Type(() => BrandEntity)
  data: BrandEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
