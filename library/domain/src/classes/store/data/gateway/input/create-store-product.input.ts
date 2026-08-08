import type { StoreOfferInput } from './store-offer.input.ts';

export interface CreateStoreProductInput {
  commandId: string;
  shopUuid: string;
  productUuid: string;
  article: string;
  showing: boolean;
  offers: StoreOfferInput[];
}
