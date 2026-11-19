import { ArrayUnique, ValidateIf } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsUUID, ValidateNested } from 'class-validator';

import { StoreOfferDto } from './store-offer.dto.ts';
import type { CreateStoreProductInput } from '../input/create-store-product.input.ts';

export class CreateStoreProductDto implements CreateStoreProductInput {
  @Expose()
  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  categoryUuids?: string[];

  @Expose()
  @IsUUID()
  shopUuid: string;

  @Expose()
  @IsUUID()
  productUuid: string;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreOfferDto)
  offers: StoreOfferDto[];
}
