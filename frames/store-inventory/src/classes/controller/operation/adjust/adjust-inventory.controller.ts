import { StoreServiceInterface } from '@library/domain';
import { Controller, FrameServiceInterface, Inject, type FrameControllerActionArgs } from '@tiyn/app';

import {
  AdjustInventoryActionPayload,
  AdjustInventoryControllerInterface,
} from './adjust-inventory-controller.interface.ts';
import { StoreInventoryFrameParams } from '../../../params';

@Controller()
export class AdjustInventoryController implements AdjustInventoryControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, AdjustInventoryActionPayload>,
  ): Promise<void> {
    await this.storeService.adjustInventory({
      commandId: crypto.randomUUID(),
      offerUuid: args.props.offerUuid,
      expectedVersion: args.payload.expectedVersion,
      quantity: args.payload.quantity,
      reason: args.payload.reason || null,
    });

    await this.frameService.close();
  }
}
