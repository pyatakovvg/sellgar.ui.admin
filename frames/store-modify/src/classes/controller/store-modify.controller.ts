import {
  CreateStoreProductDto,
  StoreProductEntity,
  StoreServiceInterface,
  VariantServiceInterface,
} from '@library/domain';

import { Controller, FrameServiceInterface, Inject, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@tiyn/app';

import { StoreModifyActionPayload, StoreModifyControllerInterface } from './store-modify-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class StoreModifyController implements StoreModifyControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(VariantServiceInterface) private readonly variantService: VariantServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.storeService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<StoreModifyFrameParams, StoreModifyActionPayload>): Promise<StoreProductEntity> {
    if (args.props.uuid) {
      if (args.payload.expectedVersion === undefined) {
        throw new Error('Не передана версия товара на складе.');
      }

      const result = await this.storeService.update({
        uuid: args.props.uuid,
        expectedVersion: args.payload.expectedVersion,
        ...(await this.toStoreProductDto(args.payload, args.payload.offerUuid)),
      });

      await this.frameService.close();

      return result;
    }

    const result = await this.storeService.create(await this.toStoreProductDto(args.payload));

    await this.frameService.close();

    return result;
  }

  async toList() {
    await this.frameService.close();
  }

  private async toStoreProductDto(payload: StoreModifyActionPayload, offerUuid?: string): Promise<CreateStoreProductDto> {
    const variant = await this.variantService.findByUuid(payload.variantUuid);
    const productUuid = variant?.product?.uuid;

    if (!productUuid) {
      throw new Error('Не удалось определить товар по выбранному варианту.');
    }

    return {
      commandId: crypto.randomUUID(),
      shopUuid: payload.shopUuid,
      productUuid,
      article: payload.article,
      showing: payload.showing,
      offers: [
        {
          uuid: offerUuid,
          variantUuid: payload.variantUuid,
          article: payload.article,
          currentPrice: payload.currentPrice,
          showing: payload.showing,
        },
      ],
    };
  }
}
