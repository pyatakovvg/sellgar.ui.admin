import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserEntity } from '../user';
import { PersonEntity } from '../person';

export class ProfileEntity {
  @ValidateNested()
  @Type(() => UserEntity)
  user: UserEntity = new UserEntity();

  @ValidateNested()
  @Type(() => PersonEntity)
  person: PersonEntity = new PersonEntity();
}
