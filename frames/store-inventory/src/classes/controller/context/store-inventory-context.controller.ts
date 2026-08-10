import { StoreServiceInterface } from '@library/domain';
import { Controller, FrameServiceInterface, Inject } from '@sellgar/app';

import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { StoreInventoryContextControllerInterface } from './store-inventory-context-controller.interface.ts';
import { StoreInventoryResultEntity } from './domain/store-inventory-result.entity.ts';

@Controller()
export class StoreInventoryContextController implements StoreInventoryContextControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async loader(args: Parameters<StoreInventoryContextControllerInterface['loader']>[0]) {
    const storeProduct = await this.storeService.findByUuid(args.props.storeProductUuid);
    const offer = storeProduct.offers.find((item) => item.uuid === args.props.offerUuid);

    if (!offer) {
      throw new Error('Предложение товара на складе не найдено.');
    }

    const result = plainToInstance(StoreInventoryResultEntity, {
      storeProduct,
      offer,
    });

    await validateOrReject(result);

    return result;
  }

  async close(): Promise<void> {
    await this.frameService.close();
  }
}
