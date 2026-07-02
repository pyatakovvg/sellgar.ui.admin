import { CreateShopDto, ShopServiceInterface, UpdateShopDto } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@tiyn/app';

import { ShopModifyActionPayload, ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';
import { ShopModifyFrameParams } from '../params';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<ShopModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.shopService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<ShopModifyFrameParams, ShopModifyActionPayload>) {
    if (args.props.uuid) {
      await this.shopService.update(args.props.uuid, args.payload as UpdateShopDto);
    } else {
      await this.shopService.create(args.payload as CreateShopDto);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
