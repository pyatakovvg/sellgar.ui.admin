import { Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsBoolean, ValidateNested } from 'class-validator';

class CurrentPrice {
  @IsNumber()
  value: number;

  @IsString()
  currencyCode: string;
}

export class CreateDto {
  @IsString()
  article: string;

  @IsUUID()
  variantUuid: string;

  @ValidateNested()
  @Type(() => CurrentPrice)
  currentPrice: CurrentPrice;

  @IsNumber()
  count: number;

  @IsBoolean()
  showing: boolean;
}
