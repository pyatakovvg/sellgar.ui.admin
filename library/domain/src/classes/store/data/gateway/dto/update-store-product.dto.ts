import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator';
import { StoreOfferDto } from './store-offer.dto.ts';
import type { UpdateStoreProductInput } from '../input/update-store-product.input.ts';
export class UpdateStoreProductDto implements UpdateStoreProductInput {
  @Expose() @IsUUID() commandId: string;
  @Expose() @IsUUID() uuid: string;
  @Expose() @IsInt() @Min(1) expectedVersion: number;
  @Expose() @IsOptional() @IsBoolean() showing?: boolean;
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreOfferDto)
  offers?: StoreOfferDto[];
}
