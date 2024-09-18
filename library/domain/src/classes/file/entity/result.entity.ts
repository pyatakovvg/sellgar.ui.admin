import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { FileEntity } from './file.entity.ts';
import { MetaEntity } from '../../../meta.entity.ts';

export class ResultEntity {
  @ValidateNested({ each: true })
  @Type(() => FileEntity)
  data: FileEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
