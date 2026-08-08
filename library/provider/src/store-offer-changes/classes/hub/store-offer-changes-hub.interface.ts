import type { StoreOfferChangesListener } from './store-offer-changes-listener.interface.ts';

export abstract class StoreOfferChangesHubInterface {
  abstract subscribe(listener: StoreOfferChangesListener): () => Promise<void>;
}
