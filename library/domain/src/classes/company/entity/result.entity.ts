import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { CompanyEntity } from './company.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested()
  @Type(() => CompanyEntity)
  data: CompanyEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
