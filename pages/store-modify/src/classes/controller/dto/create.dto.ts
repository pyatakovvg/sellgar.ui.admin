import { Type } from 'class-transformer';
import { IsUUID, IsString, IsBoolean, ValidateNested, Matches } from 'class-validator';

class CurrentPrice {
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  value: string;

  @IsString()
  currencyCode: string;
}

export class CreateDto {
  @IsString()
  article: string;

  @IsUUID()
  shopUuid: string;

  @IsUUID()
  variantUuid: string;

  @ValidateNested()
  @Type(() => CurrentPrice)
  currentPrice: CurrentPrice;

  @IsBoolean()
  showing: boolean;
}
