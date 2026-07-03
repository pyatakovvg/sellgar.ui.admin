import { IsString, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  value: number;

  @IsString()
  currencyCode: string;
}
