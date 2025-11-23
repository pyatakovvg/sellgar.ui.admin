import { IsString, IsUUID, IsDateString } from 'class-validator';

export class PersonEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  patronymic: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  sex: 'MALE' | 'FEMALE';

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
