import type { StoreAccountingRecordInput } from './store-accounting-record.input.ts';

export interface StoreOfferInput {
  uuid?: string;
  variantUuid: string;
  showing: boolean;
  records?: StoreAccountingRecordInput[];
}
