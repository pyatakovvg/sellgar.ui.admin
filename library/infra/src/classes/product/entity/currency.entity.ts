import { IsString } from 'class-validator';

export class CurrencyEntity {
  @IsString()
  code: string;

  @IsString()
  value: string;

  @IsString()
  description: string;
}
