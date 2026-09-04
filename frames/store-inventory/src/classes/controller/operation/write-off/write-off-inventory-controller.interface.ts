import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { StoreInventoryFrameParams } from '../../../params/frame.params.ts';

export interface WriteOffInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class WriteOffInventoryControllerInterface {
  abstract action(
    args: ControllerArgs<WithPayload<WriteOffInventoryActionPayload, WithParams<StoreInventoryFrameParams>>>,
  ): Promise<void>;
}
