import { StoreOfferEntity, StoreProductEntity } from '@library/domain';
import type { ProviderCleanup } from '@sellgar/app';

import {
  StoreOfferChangesHubInterface,
  type StoreOfferChangesListener,
} from '../classes/hub/store-offer-changes-hub.interface.ts';
import { StoreOfferChangesProvider } from '../store-offer-changes.provider.ts';

describe('StoreOfferChangesProvider', () => {
  it('updates the store product from the delivered payload', async () => {
    const storeProductUuid = '5b7e713c-f6c6-4450-b1dc-767a7458bf55';
    const offerUuid = '1cbf8861-884b-477a-8057-69355a8be273';
    const openedOffer = createOffer(offerUuid, 2, 'Before');
    const openedStoreProduct = createStoreProduct(storeProductUuid, 4, openedOffer);
    const updatedOffer = createOffer(offerUuid, 3, 'After');
    const updatedStoreProduct = createStoreProduct(storeProductUuid, 5, updatedOffer);
    const hub = new TestStoreOfferChangesHub();
    const provider = new StoreOfferChangesProvider(hub);

    const dispose = provider.activate();
    assertProviderCleanup(dispose);
    await hub.emitUpdated(updatedStoreProduct);

    expect(openedStoreProduct.version).toBe(5);
    expect(openedStoreProduct.offers[0]?.article).toBe('After');

    await dispose();
  });
});

const assertProviderCleanup: (value: unknown) => asserts value is ProviderCleanup = (value) => {
  if (typeof value !== 'function') {
    throw new Error('Provider cleanup was not created.');
  }
};

class TestStoreOfferChangesHub extends StoreOfferChangesHubInterface {
  private listener?: StoreOfferChangesListener;

  subscribe(listener: StoreOfferChangesListener): () => Promise<void> {
    this.listener = listener;
    return async () => {
      this.listener = undefined;
    };
  }

  async emitUpdated(payload: StoreProductEntity): Promise<void> {
    if (!this.listener) {
      throw new Error('Store offer changes listener is not subscribed.');
    }
    await this.listener.updated(payload);
  }
}

const createOffer = (uuid: string, version: number, article: string): StoreOfferEntity => {
  return Object.assign(new StoreOfferEntity(), { uuid, version, article });
};

const createStoreProduct = (uuid: string, version: number, offer: StoreOfferEntity): StoreProductEntity => {
  return Object.assign(new StoreProductEntity(), { uuid, version, offers: [offer] });
};
