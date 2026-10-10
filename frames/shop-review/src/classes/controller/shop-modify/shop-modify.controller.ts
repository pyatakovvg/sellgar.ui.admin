import { ShopEntity, ShopServiceInterface } from '@library/domain';
import * as Tokens from '@library/route-tokens';
import { Controller, type ControllerArgs, Inject, type WithParams } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';
import { ShopModifyControllerInterface } from './shop-modify-controller.interface.ts';

@Controller()
export class ShopModifyController implements ShopModifyControllerInterface {
  constructor(
    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>): Promise<ShopEntity> {
    if (!args.params.uuid) {
      throw new Error('Не указан uuid магазина');
    }

    return await this.shopService.findByUuid(args.params.uuid);
  }

  async toModify(uuid: string): Promise<void> {
    await this.navigateService.to(Tokens.ShopModifyRoute, { params: { uuid } });
  }
}
