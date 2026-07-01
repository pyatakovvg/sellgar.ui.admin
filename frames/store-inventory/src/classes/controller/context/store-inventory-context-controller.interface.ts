import { StoreOfferEntity, StoreProductEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';

import { StoreInventoryFrameParams } from '../../params';

export interface StoreInventoryLoaderData {
  storeProduct: StoreProductEntity;
  offer: StoreOfferEntity;
}

export abstract class StoreInventoryContextControllerInterface extends FrameControllerInterface<StoreInventoryFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreInventoryFrameParams>): Promise<StoreInventoryLoaderData>;

  abstract toList(): Promise<void>;
}
