import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDateString, ValidateNested } from 'class-validator';

import { MetaEntity } from '../../meta.entity.ts';

export class UserEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  patronymic: string | null;

  @IsString()
  sex: 'MALE' | 'FEMALE' | null;

  @IsDateString()
  birthday: Date | null;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  updatedAt?: Date;
}

export class UserResultEntity {
  @Type(() => UserEntity)
  @ValidateNested({ each: true })
  data: UserEntity[];

  @ValidateNested()
  @Type(() => MetaEntity)
  meta: MetaEntity;
}
