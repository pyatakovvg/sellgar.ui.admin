import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class StoreOfferInventoryEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsNumber()
  reserved: number;

  @Expose()
  @IsNumber()
  available: number;

  @Expose()
  @IsNumber()
  version: number;

  @Expose()
  @IsDateString()
  updatedAt: string;
}
