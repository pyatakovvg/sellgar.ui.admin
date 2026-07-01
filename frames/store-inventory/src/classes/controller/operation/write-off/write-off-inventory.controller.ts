import { StoreServiceInterface } from '@library/domain';
import { Controller, FrameServiceInterface, Inject, type FrameControllerActionArgs } from '@tiyn/app';

import {
  WriteOffInventoryActionPayload,
  WriteOffInventoryControllerInterface,
} from './write-off-inventory-controller.interface.ts';
import { StoreInventoryFrameParams } from '../../../params';

@Controller()
export class WriteOffInventoryController implements WriteOffInventoryControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async action(
    args: FrameControllerActionArgs<StoreInventoryFrameParams, WriteOffInventoryActionPayload>,
  ): Promise<void> {
    await this.storeService.writeOffInventory({
      commandId: crypto.randomUUID(),
      offerUuid: args.props.offerUuid,
      expectedVersion: args.payload.expectedVersion,
      quantity: args.payload.quantity,
      reason: args.payload.reason || null,
    });

    await this.frameService.close();
  }
}
