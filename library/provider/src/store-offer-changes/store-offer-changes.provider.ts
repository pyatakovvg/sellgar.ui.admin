import { StoreProductEntity } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import {
  Inject,
  Provider,
  type ProviderInterface,
  type ProviderResult,
  updateEntity,
  UseBindings,
} from '@sellgar/app';

import { StoreOfferChangesBindings } from './classes/classes.bindings.ts';
import { StoreOfferChangesHubInterface } from './classes/hub/store-offer-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, StoreOfferChangesBindings)
@Provider({ lifetime: 'application' })
export class StoreOfferChangesProvider implements ProviderInterface {
  constructor(
    @Inject(StoreOfferChangesHubInterface)
    private readonly hub: StoreOfferChangesHubInterface,
  ) {}

  activate(): ProviderResult {
    return this.hub.subscribe({
      updated: async (payload) => {
        updateEntity(StoreProductEntity, payload);
      },
    });
  }

  dispose(): void {}
}
