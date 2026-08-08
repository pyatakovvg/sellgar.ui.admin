import type { StorePriceInput } from './store-price.input.ts';

export interface StoreOfferInput {
  uuid?: string;
  variantUuid: string;
  article?: string | null;
  currentPrice: StorePriceInput;
  showing: boolean;
}
