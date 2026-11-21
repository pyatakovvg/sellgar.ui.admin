import { Expose, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsOptional, IsUUID, ValidateNested } from 'class-validator';

import { StoreAccountingRecordDto } from './store-accounting-record.dto.ts';
import type { StoreOfferInput } from '../input/store-offer.input.ts';

export class StoreOfferDto implements StoreOfferInput {
  @Expose()
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @Expose()
  @IsUUID()
  variantUuid: string;

  @Expose()
  @IsBoolean()
  showing: boolean;

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StoreAccountingRecordDto)
  records?: StoreAccountingRecordDto[];
}
