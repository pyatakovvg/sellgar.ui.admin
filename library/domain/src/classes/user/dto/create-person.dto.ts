import { IsString } from 'class-validator';

export class CreatePersonDto {
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
