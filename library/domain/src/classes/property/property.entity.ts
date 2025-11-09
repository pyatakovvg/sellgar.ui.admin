import { Type, Expose } from 'class-transformer';
import { IsUUID, IsOptional, IsString, ValidateNested, IsDateString } from 'class-validator';

import { UnitEntity } from '../unit';
import { MetaEntity } from '../../meta.entity.ts';

export class PropertyEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  groupUuid: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  unitUuid?: string;

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
  @IsString()
  type: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'DATE' | 'RANGE';

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitEntity)
  unit?: UnitEntity | null;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class PropertyResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => PropertyEntity)
  data: PropertyEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
