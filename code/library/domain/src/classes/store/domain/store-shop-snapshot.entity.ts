import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class StoreShopSnapshotEntity {
  @Expose()
  @IsUUID()
  shopUuid: string;

  @Expose()
  @IsNumber()
  sourceVersion: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsDateString()
  syncedAt: string;
}
