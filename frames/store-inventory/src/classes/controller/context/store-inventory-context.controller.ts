import { StoreServiceInterface } from '@library/domain';
import { Controller, FrameServiceInterface, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import {
  StoreInventoryContextControllerInterface,
  StoreInventoryLoaderData,
} from './store-inventory-context-controller.interface.ts';
import { StoreInventoryFrameParams } from '../../params';

@Controller()
export class StoreInventoryContextController implements StoreInventoryContextControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<StoreInventoryFrameParams>): Promise<StoreInventoryLoaderData> {
    const storeProduct = await this.storeService.findByUuid(args.props.storeProductUuid);
    const offer = storeProduct.offers.find((item) => item.uuid === args.props.offerUuid);

    if (!offer) {
      throw new Error('Предложение товара на складе не найдено.');
    }

    return {
      storeProduct,
      offer,
    };
  }

  async toList(): Promise<void> {
    await this.frameService.close();
  }
}
