import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { FolderEntity } from './folder.entity.ts';

export class FolderResultEntity {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FolderEntity)
  data: FolderEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
