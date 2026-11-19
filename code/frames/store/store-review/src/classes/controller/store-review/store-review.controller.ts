import { StoreServiceInterface } from '@library/domain';
import { StoreInventoryRoute, StoreModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';
import { StoreReviewControllerInterface } from './store-review-controller.interface.ts';
@Controller()
export class StoreReviewController implements StoreReviewControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}
  async loader(args: Parameters<StoreReviewControllerInterface['loader']>[0]) {
    if (!args.params.uuid) throw new Error('Не указан UUID товара витрины');
    return this.storeService.findByUuid(args.params.uuid);
  }
  async toModify(uuid: string): Promise<void> {
    await this.navigateService.to(StoreModifyRoute, { params: { uuid } });
  }
  async toInventory(storeProductUuid: string, recordUuid: string): Promise<void> {
    await this.navigateService.to(StoreInventoryRoute, { params: { storeProductUuid, recordUuid } });
  }
}
