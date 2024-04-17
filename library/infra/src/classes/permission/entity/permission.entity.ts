import { IsString } from 'class-validator';

export class PermissionEntity {
  @IsString()
  code: string;

  @IsString()
  displayName: string;
}
