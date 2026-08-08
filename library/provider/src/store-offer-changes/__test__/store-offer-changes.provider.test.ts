import { StoreOfferEntity, StoreProductEntity, type StoreServiceInterface } from '@library/domain';
import type { RuntimeProviderCleanup } from '@sellgar/app';

import type { StoreOfferChangesListener } from '../classes/hub/store-offer-changes-listener.interface.ts';
import { StoreOfferChangesHubInterface } from '../classes/hub/store-offer-changes-hub.interface.ts';
import { StoreOfferChangesProvider } from '../store-offer-changes.provider.ts';

describe('StoreOfferChangesProvider', () => {
  it('reloads the aggregate and updates both the offer and its store product', async () => {
    const storeProductUuid = '5b7e713c-f6c6-4450-b1dc-767a7458bf55';
    const offerUuid = '1cbf8861-884b-477a-8057-69355a8be273';
    const openedOffer = createOffer(offerUuid, 2, 'Before');
    const openedStoreProduct = createStoreProduct(storeProductUuid, 4, openedOffer);
    const updatedOffer = createOffer(offerUuid, 3, 'After');
    const updatedStoreProduct = createStoreProduct(storeProductUuid, 5, updatedOffer);
    const hub = new TestStoreOfferChangesHub();
    const store = createStoreService(updatedStoreProduct);
    const provider = new StoreOfferChangesProvider(hub, store);

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);
    await hub.emitUpdated(storeProductUuid, 5);

    expect(store.findByUuid).toHaveBeenCalledWith(storeProductUuid);
    expect(openedOffer.version).toBe(3);
    expect(openedOffer.article).toBe('After');
    expect(openedStoreProduct.version).toBe(5);
    expect(openedStoreProduct.offers[0]?.article).toBe('After');

    await dispose();
  });

  it('rejects a delivery while the canonical aggregate is behind', async () => {
    const storeProductUuid = 'ab31d94a-4974-444f-b45e-03480b88ea38';
    const openedOffer = createOffer('a3d34cc5-97c8-484b-9e49-ddf7d417fbee', 2, 'Before');
    const openedStoreProduct = createStoreProduct(storeProductUuid, 4, openedOffer);
    const hub = new TestStoreOfferChangesHub();
    const provider = new StoreOfferChangesProvider(
      hub,
      createStoreService(createStoreProduct(storeProductUuid, 4, openedOffer)),
    );

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);

    await expect(hub.emitUpdated(storeProductUuid, 5)).rejects.toThrow(
      `Store product ${storeProductUuid} version 4 is behind realtime version 5`,
    );
    expect(openedStoreProduct.version).toBe(4);

    await dispose();
  });
});

const assertRuntimeProviderCleanup: (value: unknown) => asserts value is RuntimeProviderCleanup = (value) => {
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

  async emitUpdated(storeProductUuid: string, version: number): Promise<void> {
    if (!this.listener) {
      throw new Error('Store offer changes listener is not subscribed.');
    }
    await this.listener.updated(storeProductUuid, version);
  }
}

const createStoreService = (storeProduct: StoreProductEntity) => {
  return {
    findByUuid: vi.fn(async () => storeProduct),
  } as unknown as StoreServiceInterface & { findByUuid: ReturnType<typeof vi.fn> };
};

const createOffer = (uuid: string, version: number, article: string): StoreOfferEntity => {
  return Object.assign(new StoreOfferEntity(), { uuid, version, article });
};

const createStoreProduct = (uuid: string, version: number, offer: StoreOfferEntity): StoreProductEntity => {
  return Object.assign(new StoreProductEntity(), { uuid, version, offers: [offer] });
};
