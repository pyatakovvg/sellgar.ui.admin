import { Type } from 'class-transformer';
import { IsBoolean, IsString, IsUUID, ValidateNested } from 'class-validator';

import { StoreOfferDto } from './store-offer.dto.ts';

export class CreateStoreProductDto {
  @IsUUID()
  commandId: string;

  @IsUUID()
  shopUuid: string;

  @IsUUID()
  productUuid: string;

  @IsString()
  article: string;

  @IsBoolean()
  showing: boolean;

  @ValidateNested({ each: true })
  @Type(() => StoreOfferDto)
  offers: StoreOfferDto[];
}
