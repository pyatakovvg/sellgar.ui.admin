import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsString, IsUUID, Min } from 'class-validator';

import { ShopContactPurpose } from './shop-contact-purpose.enum.ts';
import { ShopContactType } from './shop-contact-type.enum.ts';

export class ShopContactEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsEnum(ShopContactType)
  type: ShopContactType;

  @Expose()
  @IsEnum(ShopContactPurpose)
  purpose: ShopContactPurpose;

  @Expose()
  @IsString()
  value: string;

  @Expose()
  @IsBoolean()
  isPublic: boolean;

  @Expose()
  @IsInt()
  @Min(0)
  sortOrder: number;
}
