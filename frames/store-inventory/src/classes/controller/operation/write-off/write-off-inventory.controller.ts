import { StoreServiceInterface } from '@library/domain';
import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app-v2';
import { NavigateServiceInterface } from '@sellgar/app-v2';

import { WriteOffInventoryControllerInterface } from './write-off-inventory-controller.interface.ts';

@Controller()
export class WriteOffInventoryController implements WriteOffInventoryControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async action(args: Parameters<WriteOffInventoryControllerInterface['action']>[0]): Promise<void> {
    await this.storeService.writeOffInventory({
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
