import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ShopContactPurpose } from '../../../domain/shop-contact-purpose.enum.ts';
import { ShopContactType } from '../../../domain/shop-contact-type.enum.ts';
import type { ShopContactInput } from '../input/shop-details.input.ts';

export class ShopContactDto implements ShopContactInput {
  @Expose()
  @IsEnum(ShopContactType)
  type: ShopContactType;

  @Expose()
  @IsEnum(ShopContactPurpose)
  purpose: ShopContactPurpose;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  value: string;

  @Expose()
  @IsBoolean()
  isPublic: boolean;

  @Expose()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  sortOrder: number;
}
