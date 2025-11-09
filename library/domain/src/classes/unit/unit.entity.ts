import { Type, Expose } from 'class-transformer';
import { IsUUID, IsString, ValidateNested, IsDateString } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class UnitEntity {
  @Expose()
  @IsUUID()
  uuid: string;

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
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class UnitResultEntity {
  @ValidateNested()
  @Type(() => UnitEntity)
  data: UnitEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
