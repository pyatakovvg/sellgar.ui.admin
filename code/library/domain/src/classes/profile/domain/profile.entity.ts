import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserEntity } from '../../user';
import { PersonEntity } from '../../person';

export class ProfileEntity {
  @Expose()
  @ValidateNested()
  @Type(() => UserEntity)
  user: UserEntity;

  @Expose()
  @ValidateNested()
  @Type(() => PersonEntity)
  person: PersonEntity;
}
