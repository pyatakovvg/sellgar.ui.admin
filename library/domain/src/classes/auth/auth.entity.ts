import { Type } from 'class-transformer';
import { IsString, IsDateString, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class AuthEntity {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsDateString()
  expiresAt: string;
}

export class AuthResultEntity {
  @ValidateNested()
  @Type(() => AuthEntity)
  data: AuthEntity;

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
