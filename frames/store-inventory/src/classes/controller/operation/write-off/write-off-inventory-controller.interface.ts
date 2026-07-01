import { FrameControllerInterface, type FrameControllerActionArgs } from '@tiyn/app';

import { StoreInventoryFrameParams } from '../../../params';

export interface WriteOffInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class WriteOffInventoryControllerInterface extends FrameControllerInterface<StoreInventoryFrameParams> {
  abstract action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, WriteOffInventoryActionPayload>,
  ): Promise<void>;
}
