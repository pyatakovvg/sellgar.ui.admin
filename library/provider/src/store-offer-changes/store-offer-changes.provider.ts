import { StoreOfferEntity, StoreProductEntity, StoreServiceInterface } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import {
  Inject,
  type RuntimeProviderResult,
  SingletonProvider,
  type SingletonProviderInterface,
  updateEntity,
  UseBindings,
} from '@sellgar/app';

import { StoreOfferChangesBindings } from './classes/classes.bindings.ts';
import { StoreOfferChangesHubInterface } from './classes/hub/store-offer-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, StoreOfferChangesBindings)
@SingletonProvider()
export class StoreOfferChangesProvider implements SingletonProviderInterface {
  constructor(
    @Inject(StoreOfferChangesHubInterface)
    private readonly hub: StoreOfferChangesHubInterface,
    @Inject(StoreServiceInterface)
    private readonly store: StoreServiceInterface,
  ) {}

  setup(): RuntimeProviderResult {
    return this.hub.subscribe({
      updated: async (storeProductUuid, expectedVersion) => {
        const storeProduct = await this.store.findByUuid(storeProductUuid);

        if (storeProduct.version < expectedVersion) {
          throw new Error(
            `Store product ${storeProductUuid} version ${storeProduct.version} is behind realtime version ${expectedVersion}`,
          );
        }

        for (const offer of storeProduct.offers) {
          updateEntity(StoreOfferEntity, offer);
        }
        updateEntity(StoreProductEntity, storeProduct);
      },
    });
  }
}
