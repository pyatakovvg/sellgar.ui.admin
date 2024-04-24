import { IsString, IsUUID } from 'class-validator';

export class PersonEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  @IsString()
  sex: 'MALE' | 'FEMALE';

  @IsString()
  birthday: string;
}
