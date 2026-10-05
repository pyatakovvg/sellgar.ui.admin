import type { ShopAddressInput, ShopContactInput, ShopLegalDetailsInput } from './shop-details.input.ts';

export interface CreateShopInput {
  name: string;
  legalDetails?: ShopLegalDetailsInput | null;
  contacts?: ShopContactInput[];
  addresses?: ShopAddressInput[];
}
