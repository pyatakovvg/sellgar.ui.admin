import { Entity } from '@sellgar/app';
import { Expose } from 'class-transformer';
import { IsInt, IsUUID } from 'class-validator';
import { ProductVariantEntity } from './product-variant.entity.ts';

@Entity({ identity: 'uuid' })
export class ProductVariantDetailEntity extends ProductVariantEntity {
  @Expose()
  @IsUUID()
  productUuid: string;
  @Expose()
  @IsInt()
  version: number;
  @Expose()
  @IsUUID()
  typeUuid: string;
  @Expose()
  @IsInt()
  typeVersion: number;
}
