import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { FileEntity } from './file.entity.ts';

class MetaEntity {}

export class ResultEntity {
  @ValidateNested({ each: true })
  @Type(() => FileEntity)
  data: FileEntity[];

  @IsObject()
  @Type(() => MetaEntity)
  @ValidateNested()
  meta: MetaEntity;
}
