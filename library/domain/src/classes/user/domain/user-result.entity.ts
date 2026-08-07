import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta/index.ts';

import { UserEntity } from './user.entity.ts';

export class UserResultEntity {
  @Expose()
  @IsArray()
  @Type(() => UserEntity)
  @ValidateNested({ each: true })
  data: UserEntity[];

  @Expose()
  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
