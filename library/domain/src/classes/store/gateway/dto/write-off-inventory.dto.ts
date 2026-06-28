import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class WriteOffInventoryDto {
  @IsUUID()
  commandId: string;

  @IsUUID()
  offerUuid: string;

  @IsNumber()
  expectedVersion: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  reason?: string | null;
}
