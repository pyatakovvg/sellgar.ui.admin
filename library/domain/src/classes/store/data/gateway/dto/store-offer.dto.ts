import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { PriceDto } from './price.dto.ts';
import type { StoreOfferInput } from '../input/create-store-product.input.ts';

export class StoreOfferDto implements StoreOfferInput {
  @Expose()
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @Expose()
  @IsUUID()
  variantUuid: string;

  @Expose()
  @IsOptional()
  @IsString()
  article?: string | null;

  @Expose()
  @ValidateNested()
  @Type(() => PriceDto)
  currentPrice: PriceDto;

  @Expose()
  @IsBoolean()
  showing: boolean;
}
