import type { ShopAddressInput, ShopContactInput, ShopLegalDetailsInput } from './shop-details.input.ts';

export interface UpdateShopInput {
  version: number;
  name?: string;
  legalDetails?: ShopLegalDetailsInput | null;
  contacts?: ShopContactInput[];
  addresses?: ShopAddressInput[];
}
