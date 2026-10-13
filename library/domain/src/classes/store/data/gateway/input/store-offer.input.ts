import type { StorePriceInput } from './store-price.input.ts';

export interface StoreOfferInput {
  uuid?: string;
  variantUuid: string;
  currentPrice: StorePriceInput;
  showing: boolean;
}
