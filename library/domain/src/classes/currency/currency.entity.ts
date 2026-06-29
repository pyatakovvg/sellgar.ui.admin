import { Type, Expose } from 'class-transformer';
import { IsDateString, IsString, IsNumber, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class CurrencyEntity {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  value: string;

  @Expose()
  @IsNumber()
  order: number;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class CurrencyResultEntity {
  @Expose()
  @ValidateNested()
  @Type(() => CurrencyEntity)
  data: CurrencyEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
