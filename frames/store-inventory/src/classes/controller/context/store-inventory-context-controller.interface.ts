import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@sellgar/app';

import type { StoreInventoryResultEntity } from './domain/store-inventory-result.entity.ts';
import { StoreInventoryFrameParams } from '../../params/frame.params.ts';

export abstract class StoreInventoryContextControllerInterface extends FrameControllerInterface<StoreInventoryFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreInventoryFrameParams>): Promise<StoreInventoryResultEntity>;

  abstract close(): Promise<void>;
}
