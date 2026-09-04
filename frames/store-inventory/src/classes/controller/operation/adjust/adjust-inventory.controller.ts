import { StoreServiceInterface } from '@library/domain';
import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { AdjustInventoryControllerInterface } from './adjust-inventory-controller.interface.ts';

@Controller()
export class AdjustInventoryController implements AdjustInventoryControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async action(args: Parameters<AdjustInventoryControllerInterface['action']>[0]): Promise<void> {
    await this.storeService.adjustInventory({
      commandId: crypto.randomUUID(),
      offerUuid: args.params.offerUuid,
      expectedVersion: args.payload.expectedVersion,
      quantity: args.payload.quantity,
      reason: args.payload.reason || null,
    });

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }
}
