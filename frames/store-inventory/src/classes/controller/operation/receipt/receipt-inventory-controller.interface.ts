import { FrameControllerInterface, type FrameControllerActionArgs } from '@sellgar/app';

import { StoreInventoryFrameParams } from '../../../params';

export interface ReceiptInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class ReceiptInventoryControllerInterface extends FrameControllerInterface<StoreInventoryFrameParams> {
  abstract action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, ReceiptInventoryActionPayload>,
  ): Promise<void>;
}
