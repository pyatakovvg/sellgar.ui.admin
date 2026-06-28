import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class AdjustInventoryDto {
  @IsUUID()
  commandId: string;

  @IsUUID()
  offerUuid: string;

  @IsNumber()
  expectedVersion: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsString()
  reason?: string | null;
}
