import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';
import type { ArchiveStoreProductInput } from '../input/archive-store-product.input.ts';

export class ArchiveStoreProductDto implements ArchiveStoreProductInput {
  @Expose()
  @IsUUID()
  commandId: string;

  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  expectedVersion: number;
}
