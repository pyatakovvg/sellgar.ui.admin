import type { ControllerArgs, WithParams } from '@sellgar/app-v2';

import type { StoreInventoryResultEntity } from './domain/store-inventory-result.entity.ts';
import { StoreInventoryFrameParams } from '../../params/frame.params.ts';

export abstract class StoreInventoryContextControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<StoreInventoryFrameParams>>): Promise<StoreInventoryResultEntity>;

  abstract close(): Promise<void>;
}
