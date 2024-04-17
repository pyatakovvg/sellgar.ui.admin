import { PersonEntity } from '@library/infra';

import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class ProfileEntity {
  @IsString({ each: true })
  roles: string[];

  @IsString({ each: true })
  permissions: string[];

  @ValidateNested()
  @Type(() => PersonEntity)
  person: PersonEntity;
}
