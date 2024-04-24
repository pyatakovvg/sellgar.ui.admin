import { IsString } from 'class-validator';

export class BrandEntity {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
