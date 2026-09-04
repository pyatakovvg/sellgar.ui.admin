import { StoreServiceInterface, type StoreProductEntity } from '@library/domain';

import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { StoreModifyControllerInterface } from './store-modify-controller.interface.ts';
import { StoreModifyMapper } from './mapper/store-modify.mapper.ts';

@Controller()
export class StoreModifyController implements StoreModifyControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<StoreModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return this.storeService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<StoreModifyControllerInterface['action']>[0]): Promise<StoreProductEntity> {
    if (args.params.uuid) {
      if (args.payload.expectedVersion === undefined) {
        throw new Error('Не передана версия товара на складе.');
      }

      const result = await this.storeService.update({
        uuid: args.params.uuid,
        expectedVersion: args.payload.expectedVersion,
        ...StoreModifyMapper.toCreateInput(args.payload, crypto.randomUUID()),
      });

      await this.finish();

      return result;
    }

    const result = await this.storeService.create(StoreModifyMapper.toCreateInput(args.payload, crypto.randomUUID()));

    await this.finish();

    return result;
  }

  async close() {
    await this.navigateService.close();
  }

  private async finish(): Promise<void> {
    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }
}
