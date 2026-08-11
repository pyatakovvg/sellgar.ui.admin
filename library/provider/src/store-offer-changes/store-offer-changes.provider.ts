import { StoreProductEntity } from '@library/domain';
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
  ) {}

  setup(): RuntimeProviderResult {
    return this.hub.subscribe({
      updated: async (payload) => {
        updateEntity(StoreProductEntity, payload);
      },
    });
  }
}
