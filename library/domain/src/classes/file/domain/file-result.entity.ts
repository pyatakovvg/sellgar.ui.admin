import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { FileEntity } from './file.entity.ts';

export class FileResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileEntity)
  data: FileEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
