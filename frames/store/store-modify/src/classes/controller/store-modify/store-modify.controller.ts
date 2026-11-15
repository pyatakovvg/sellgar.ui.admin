import { CategoryListControllerInterface } from '../category-list/category-list-controller.interface.ts';
import { StoreServiceInterface, type StoreProductEntity } from '@library/domain';

import { Controller, Inject, NavigationBlockerServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { StoreReviewRoute } from '@library/route-tokens';

import { StoreModifyControllerInterface } from './store-modify-controller.interface.ts';
import { StoreModifyMapper } from './mapper/store-modify.mapper.ts';

@Controller()
export class StoreModifyController implements StoreModifyControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly navigationBlocker: NavigationBlockerServiceInterface,
    @Inject(CategoryListControllerInterface) private readonly categories: CategoryListControllerInterface,
  ) {}

  async loader(args: Parameters<StoreModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    const product = await this.storeService.findByUuid(args.params.uuid);
    await this.categories.load(product.shopUuid);
    return product;
  }

  async action(args: Parameters<StoreModifyControllerInterface['action']>[0]): Promise<StoreProductEntity> {
    if (args.params.uuid) {
      if (args.payload.expectedVersion === undefined) {
        throw new Error('Не передана версия товара на складе.');
      }

      const input = StoreModifyMapper.toCreateInput(args.payload, crypto.randomUUID());
      const result = await this.storeService.update({
        uuid: args.params.uuid,
        expectedVersion: args.payload.expectedVersion,
        commandId: input.commandId,
        showing: input.showing,
        categoryUuids: input.categoryUuids,
        offers: input.offers,
      });

      await this.finish(result.uuid);

      return result;
    }

    const result = await this.storeService.create(StoreModifyMapper.toCreateInput(args.payload, crypto.randomUUID()));

    await this.finish(result.uuid);

    return result;
  }

  async close(uuid?: string) {
    if (uuid) {
      await this.navigateService.to(StoreReviewRoute, { params: { uuid } });
      return;
    }
    await this.navigateService.close();
  }

  private async finish(uuid: string): Promise<void> {
    await this.revalidateService.revalidate();
    await this.navigationBlocker.allow(() => this.navigateService.to(StoreReviewRoute, { params: { uuid } }));
  }
}
