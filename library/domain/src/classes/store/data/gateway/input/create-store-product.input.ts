export interface StorePriceInput {
  value: string;
  currencyCode: string;
}

export interface StoreOfferInput {
  uuid?: string;
  variantUuid: string;
  article?: string | null;
  currentPrice: StorePriceInput;
  showing: boolean;
}

export interface CreateStoreProductInput {
  commandId: string;
  shopUuid: string;
  productUuid: string;
  article: string;
  showing: boolean;
  offers: StoreOfferInput[];
}
