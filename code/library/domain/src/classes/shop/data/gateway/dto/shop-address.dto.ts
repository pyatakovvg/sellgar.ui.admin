import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ShopAddressType } from '../../../domain/shop-address-type.enum.ts';
import type { ShopAddressInput } from '../input/shop-details.input.ts';

export class ShopAddressDto implements ShopAddressInput {
  @Expose()
  @IsEnum(ShopAddressType)
  type: ShopAddressType;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  address: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  comment?: string | null;
}
