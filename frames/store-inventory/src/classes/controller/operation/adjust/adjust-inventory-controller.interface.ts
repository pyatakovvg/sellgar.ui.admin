import { FrameControllerInterface, type FrameControllerActionArgs } from '@sellgar/app';

import { StoreInventoryFrameParams } from '../../../params';

export interface AdjustInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class AdjustInventoryControllerInterface extends FrameControllerInterface<StoreInventoryFrameParams> {
  abstract action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, AdjustInventoryActionPayload>,
  ): Promise<void>;
}
