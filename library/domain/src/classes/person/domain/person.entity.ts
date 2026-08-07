import { Expose } from 'class-transformer';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class PersonEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  surname: string;

  @Expose()
  @IsString()
  patronymic: string;

  @Expose()
  @IsDateString()
  birthday: string;

  @Expose()
  @IsString()
  sex: 'MALE' | 'FEMALE';

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
