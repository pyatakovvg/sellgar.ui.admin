import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { CreatePermissionDto } from '../../permission/dto/create-permission.dto.ts';

export class CreateRoleDto {
  @IsString()
  code: string;

  @IsString()
  displayName: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions: CreatePermissionDto[];
}
