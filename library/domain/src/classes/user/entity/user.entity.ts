import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

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
