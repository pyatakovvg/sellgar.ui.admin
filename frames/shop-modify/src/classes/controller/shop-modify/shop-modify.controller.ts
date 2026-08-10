import { ShopServiceInterface } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
} from '@sellgar/app';

import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<ShopModifyControllerInterface['loader']>[0]) {
    if (!args.props.uuid) {
      return void 0;
    }

    return this.shopService.findByUuid(args.props.uuid);
  }

  async action(args: Parameters<ShopModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.shopService.update(args.payload.uuid, args.payload);
    } else {
      await this.shopService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
