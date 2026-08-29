import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { StoreOfferChangesHubInterface } from './hub/store-offer-changes-hub.interface.ts';
import { StoreOfferChangesHub } from './hub/store-offer-changes.hub.ts';

export class StoreOfferChangesBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreOfferChangesHubInterface).to(StoreOfferChangesHub).inSingletonScope();
  }
}
