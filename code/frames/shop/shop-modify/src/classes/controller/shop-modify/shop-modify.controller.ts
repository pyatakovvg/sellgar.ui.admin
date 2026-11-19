import { ShopServiceInterface } from '@library/domain';
import * as Tokens from '@library/route-tokens';
import {
  Controller,
  type ControllerArgs,
  Inject,
  NavigateServiceInterface,
  type WithParams,
  type WithPayload,
} from '@sellgar/app';

import type { ShopModifyFrameParams } from '../../params/frame.params.ts';
import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';
import { ShopFormMapper } from './mapper/shop-form.mapper.ts';

import type { ShopFormInput } from './input/shop-form.input.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>) {
    if (!args.params.uuid) {
      return undefined;
    }

    return await this.shopService.findByUuid(args.params.uuid);
  }

  async action(args: ControllerArgs<WithPayload<ShopFormInput, WithParams<ShopModifyFrameParams>>>): Promise<void> {
    const { uuid } = args.params;

    if (!uuid) {
      const shop = await this.shopService.create(ShopFormMapper.toCreateInput(args.payload));

      await this.navigateService.to(Tokens.ShopReviewRoute, { params: { uuid: shop.uuid }, revalidate: true });

      return;
    }

    await this.shopService.update(uuid, ShopFormMapper.toUpdateInput(args.payload));

    await this.navigateService.to(Tokens.ShopReviewRoute, { params: { uuid }, revalidate: true });
  }

  async toReview(uuid?: string) {
    if (!uuid) {
      await this.navigateService.close();

      return;
    }

    await this.navigateService.to(Tokens.ShopReviewRoute, { params: { uuid } });
  }
}
