import { IsEmail, IsArray, IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @IsUUID()
  uuid!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsArray()
  roles!: string[];
}
