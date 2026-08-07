import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class StoreInventoryMovementEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsUUID()
  offerUuid: string;

  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsNumber()
  quantityDelta: number;

  @Expose()
  @IsNumber()
  reservedDelta: number;

  @Expose()
  @IsString()
  sourceType: string;

  @Expose()
  @IsOptional()
  @IsUUID()
  sourceUuid?: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  reason?: string | null;

  @Expose()
  @IsOptional()
  @IsUUID()
  createdBy?: string | null;

  @Expose()
  @IsDateString()
  createdAt: string;
}
