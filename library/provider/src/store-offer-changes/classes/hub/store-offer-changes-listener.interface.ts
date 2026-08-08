export interface StoreOfferChangesListener {
  readonly updated: (storeProductUuid: string, version: number) => Promise<void>;
}
