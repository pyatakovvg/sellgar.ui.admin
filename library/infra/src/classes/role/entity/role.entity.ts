import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

import { PermissionEntity } from '../../permission/entity/permission.entity.ts';

export class RoleEntity {
  @IsString()
  code: string;

  @IsString()
  displayName: string;

  @ValidateNested({ each: true })
  @Type(() => PermissionEntity)
  permissions: PermissionEntity[];
}
