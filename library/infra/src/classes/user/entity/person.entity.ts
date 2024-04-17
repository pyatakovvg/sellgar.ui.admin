import { IsString } from 'class-validator';

export class PersonEntity {
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;
}
