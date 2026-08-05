import { CreateStoreProductDto, StoreProductEntity, StoreServiceInterface } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@sellgar/app';

import { StoreModifyActionPayload, StoreModifyControllerInterface } from './store-modify-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class StoreModifyController implements StoreModifyControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.storeService.findByUuid(args.props.uuid);
  }

  async action(
    args: FrameControllerActionArgs<StoreModifyFrameParams, StoreModifyActionPayload>,
  ): Promise<StoreProductEntity> {
    if (args.props.uuid) {
      if (args.payload.expectedVersion === undefined) {
        throw new Error('Не передана версия товара на складе.');
      }

      const result = await this.storeService.update({
        uuid: args.props.uuid,
        expectedVersion: args.payload.expectedVersion,
        ...this.toStoreProductDto(args.payload),
      });

      await this.frameService.close();

      return result;
    }

    const result = await this.storeService.create(this.toStoreProductDto(args.payload));

    await this.frameService.close();

    return result;
  }

  async toList() {
    await this.frameService.close();
  }

  private toStoreProductDto(payload: StoreModifyActionPayload): CreateStoreProductDto {
    return {
      commandId: crypto.randomUUID(),
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      article: payload.offers[0]?.article ?? '',
      showing: payload.showing,
      offers: payload.offers.map((offer) => ({
        uuid: offer.uuid,
        variantUuid: offer.variantUuid,
        article: offer.article,
        currentPrice: offer.currentPrice,
        showing: offer.showing,
      })),
    };
  }
}
