import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import type { ReceiptOfferInventoryInput } from '../input/receipt-offer-inventory.input.ts';

export class ReceiptOfferInventoryDto implements ReceiptOfferInventoryInput {
  @Expose()
  @IsUUID()
  commandId: string;

  @Expose()
  @IsUUID()
  offerUuid: string;

  @Expose()
  @IsInt()
  expectedVersion: number;

  @Expose()
  @IsInt()
  @Min(1)
  quantity: number;

  @Expose()
  @IsOptional()
  @IsString()
  reason?: string | null;

  @Expose()
  @IsOptional()
  @IsUUID()
  sourceUuid?: string | null;

  @Expose()
  @IsOptional()
  @IsUUID()
  createdBy?: string | null;
}
