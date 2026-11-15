import type { StoreOfferInput } from './store-offer.input.ts';

export interface CreateStoreProductInput {
  commandId: string;
  categoryUuids?: string[];
  shopUuid: string;
  productUuid: string;
  showing: boolean;
  offers: StoreOfferInput[];
}
