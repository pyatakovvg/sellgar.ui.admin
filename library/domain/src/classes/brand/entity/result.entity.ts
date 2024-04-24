import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';

import { BrandEntity } from './brand.entity.ts';

class MetaEntity {
  @IsNumber()
  totalRows: number;
}

export class ResultEntity {
  @ValidateNested()
  @Type(() => BrandEntity)
  data: BrandEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
