import type { StorePriceInput } from './store-price.input.ts';
import type { StoreRecordClarificationInput } from './store-record-clarification.input.ts';

export interface StoreAccountingRecordInput {
  currentPrice?: StorePriceInput;
  uuid?: string;
  article?: string;
  order?: number;
  clarifications?: StoreRecordClarificationInput[];
}
