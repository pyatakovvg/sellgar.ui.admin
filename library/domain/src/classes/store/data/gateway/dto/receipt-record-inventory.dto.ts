import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import type { ReceiptRecordInventoryInput } from '../input/receipt-record-inventory.input.ts';

export class ReceiptRecordInventoryDto implements ReceiptRecordInventoryInput {
  @Expose()
  @IsUUID()
  commandId: string;

  @Expose()
  @IsUUID()
  recordUuid: string;

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
