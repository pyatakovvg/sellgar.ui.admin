import { Type, Expose } from 'class-transformer';
import { IsDateString, IsString, IsNumber, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class CurrencyEntity {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

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
  @ValidateNested()
  @Type(() => CurrencyEntity)
  data: CurrencyEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
