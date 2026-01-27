import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateDto {
  @Expose()
  @IsString()
  name: string;
}
