import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { UpdatePermissionDto } from '../../permission/dto/update-permission.dto.ts';

export class UpdateRoleDto {
  @IsString()
  code: string;

  @IsString()
  displayName: string;

  @ValidateNested({ each: true })
  @Type(() => UpdatePermissionDto)
  permissions: UpdatePermissionDto[];
}
