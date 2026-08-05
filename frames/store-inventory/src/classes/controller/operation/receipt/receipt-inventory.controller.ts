import { StoreServiceInterface } from '@library/domain';
import { Controller, FrameServiceInterface, Inject, type FrameControllerActionArgs } from '@sellgar/app';

import {
  ReceiptInventoryActionPayload,
  ReceiptInventoryControllerInterface,
} from './receipt-inventory-controller.interface.ts';
import { StoreInventoryFrameParams } from '../../../params';

@Controller()
export class ReceiptInventoryController implements ReceiptInventoryControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, ReceiptInventoryActionPayload>,
  ): Promise<void> {
    await this.storeService.receiptInventory({
      commandId: crypto.randomUUID(),
      offerUuid: args.props.offerUuid,
      expectedVersion: args.payload.expectedVersion,
      quantity: args.payload.quantity,
      reason: args.payload.reason || null,
    });

    await this.frameService.close();
  }
}
