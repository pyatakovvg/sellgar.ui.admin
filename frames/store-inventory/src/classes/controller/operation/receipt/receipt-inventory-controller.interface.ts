import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { StoreInventoryFrameParams } from '../../../params/frame.params.ts';

export interface ReceiptInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class ReceiptInventoryControllerInterface {
  abstract action(
    args: ControllerArgs<WithPayload<ReceiptInventoryActionPayload, WithParams<StoreInventoryFrameParams>>>,
  ): Promise<void>;
}
