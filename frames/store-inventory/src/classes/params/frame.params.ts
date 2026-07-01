import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class StoreInventoryFrameParams {
  @Expose()
  @IsUUID()
  storeProductUuid: string;

  @Expose()
  @IsUUID()
  offerUuid: string;
}
