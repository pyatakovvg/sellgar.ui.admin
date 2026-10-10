import { ShopServiceInterface } from '@library/domain';
import * as Tokens from '@library/route-tokens';
import { Controller, type ControllerArgs, Inject, type WithParams, type WithPayload } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';
import { ShopFormMapper } from './mapper/shop-form.mapper.ts';
import { ShopModifyFrameParams } from '../../params/frame.params.ts';

import type { ShopFormInput } from './input/shop-form.input.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>) {
    if (!args.params.uuid) {
      throw new Error('Missing uuid');
    }

    return await this.shopService.findByUuid(args.params.uuid);
  }

  async action(args: ControllerArgs<WithPayload<ShopFormInput>>) {
    await this.shopService.update(args.payload.uuid, ShopFormMapper.toUpdateInput(args.payload));

    await this.navigateService.to(Tokens.ShopReviewRoute, { params: { uuid: args.payload.uuid }, revalidate: true });
  }

  async toReview(uuid: string) {
    await this.navigateService.to(Tokens.ShopReviewRoute, { params: { uuid } });
  }
}
