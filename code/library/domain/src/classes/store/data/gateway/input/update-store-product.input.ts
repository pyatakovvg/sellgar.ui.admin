import type { StoreOfferInput } from './store-offer.input.ts';
export interface UpdateStoreProductInput {
  categoryUuids?: string[];
  uuid: string;
  expectedVersion: number;
  showing?: boolean;
  offers?: StoreOfferInput[];
}
