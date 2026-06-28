import { Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsBoolean, ValidateNested, IsOptional } from 'class-validator';

class CurrentPrice {
  @IsNumber()
  value: number;

  @IsString()
  currencyCode: string;
}

class StoreVariantOfferDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsUUID()
  variantUuid: string;

  @IsOptional()
  @IsString()
  sku?: string | null;

  @IsOptional()
  @IsString()
  article?: string | null;

  @IsOptional()
  @IsString()
  titleOverride?: string | null;

  @IsOptional()
  @IsString()
  descriptionOverride?: string | null;

  @ValidateNested()
  @Type(() => CurrentPrice)
  currentPrice: CurrentPrice;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  reserved?: number;

  @IsBoolean()
  showing: boolean;
}

export class CreateDto {
  @IsUUID()
  commandId: string;

  @IsUUID()
  shopUuid: string;

  @IsUUID()
  productUuid: string;

  @IsString()
  article: string;

  @IsOptional()
  @IsString()
  titleOverride?: string | null;

  @IsOptional()
  @IsString()
  descriptionOverride?: string | null;

  @IsBoolean()
  showing: boolean;

  @ValidateNested()
  @Type(() => StoreVariantOfferDto)
  offers: StoreVariantOfferDto[];
}
