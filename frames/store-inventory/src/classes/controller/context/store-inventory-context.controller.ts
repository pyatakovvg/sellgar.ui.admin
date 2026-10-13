import { StoreServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { StoreInventoryContextControllerInterface } from './store-inventory-context-controller.interface.ts';
import { StoreInventoryResultEntity } from './domain/store-inventory-result.entity.ts';

@Controller()
export class StoreInventoryContextController implements StoreInventoryContextControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: Parameters<StoreInventoryContextControllerInterface['loader']>[0]) {
    const storeProduct = await this.storeService.findByUuid(args.params.storeProductUuid);
    const offer = storeProduct.offers.find((item) =>
      item.records.some((record) => record.uuid === args.params.recordUuid),
    );

    if (!offer) {
      throw new Error('Учётная запись на складе не найдена.');
    }

    const record = offer.records.find((item) => item.uuid === args.params.recordUuid);

    if (!record) {
      throw new Error('Учётная запись на складе не найдена.');
    }

    const result = plainToInstance(StoreInventoryResultEntity, {
      storeProduct,
      offer,
      record,
    });

    await validateOrReject(result);

    return result;
  }

  async close(): Promise<void> {
    await this.navigateService.close();
  }
}
