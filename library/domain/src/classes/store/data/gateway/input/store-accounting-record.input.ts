import type { StoreRecordClarificationInput } from './store-record-clarification.input.ts';

export interface StoreAccountingRecordInput {
  uuid?: string;
  article?: string;
  clarifications?: StoreRecordClarificationInput[];
}
