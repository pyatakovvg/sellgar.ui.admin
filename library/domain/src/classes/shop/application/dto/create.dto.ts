import { IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;
}
