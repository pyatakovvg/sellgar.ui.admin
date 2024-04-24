import { IsString } from 'class-validator';

export class CategoryEntity {
  @IsString()
  code: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
