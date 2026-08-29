import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app-v2';

import { StoreInventoryFrameParams } from '../../../params/frame.params.ts';

export interface AdjustInventoryActionPayload {
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
}

export abstract class AdjustInventoryControllerInterface {
  abstract action(
    args: ControllerArgs<WithPayload<AdjustInventoryActionPayload, WithParams<StoreInventoryFrameParams>>>,
  ): Promise<void>;
}
