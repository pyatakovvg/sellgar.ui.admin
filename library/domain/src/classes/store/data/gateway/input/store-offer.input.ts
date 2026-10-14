import type { StorePriceInput } from './store-price.input.ts';
import type { StoreAccountingRecordInput } from './store-accounting-record.input.ts';

export interface StoreOfferInput {
  uuid?: string;
  variantUuid: string;
  currentPrice: StorePriceInput;
  showing: boolean;
  records?: StoreAccountingRecordInput[];
}
