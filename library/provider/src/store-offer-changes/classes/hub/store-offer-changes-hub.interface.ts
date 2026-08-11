import type { StoreProductEntity } from '@library/domain';

export interface StoreOfferChangesListener {
  readonly updated: (payload: StoreProductEntity) => Promise<void>;
}

export abstract class StoreOfferChangesHubInterface {
  abstract subscribe(listener: StoreOfferChangesListener): () => Promise<void>;
}
