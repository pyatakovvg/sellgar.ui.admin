import { PersonEntity, RoleEntity } from '@library/domain';

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ProfileEntity {
  @Type(() => RoleEntity)
  @ValidateNested({ each: true })
  roles: RoleEntity[];

  @ValidateNested()
  @Type(() => PersonEntity)
  person: PersonEntity;
}
