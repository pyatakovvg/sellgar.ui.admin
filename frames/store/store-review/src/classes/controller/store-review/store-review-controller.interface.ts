import type { StoreProductEntity } from '@library/domain';
import type { ControllerArgs, WithParams } from '@sellgar/app';
import type { StoreReviewFrameParams } from '../../params/frame.params.ts';
export abstract class StoreReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<StoreReviewFrameParams>>): Promise<StoreProductEntity>;
  abstract toModify(uuid: string): Promise<void>;
  abstract toInventory(storeProductUuid: string, recordUuid: string): Promise<void>;
}
