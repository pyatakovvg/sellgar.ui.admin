import { ShopEntity, CreateShopDto, UpdateShopDto } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@tiyn/app';

import { ShopModifyFrameParams } from '../params';

export type ShopModifyActionPayload = CreateShopDto | UpdateShopDto;

export abstract class ShopModifyControllerInterface extends FrameControllerInterface<ShopModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<ShopModifyFrameParams>): Promise<ShopEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<ShopModifyFrameParams, ShopModifyActionPayload>): Promise<void>;

  abstract toList(): Promise<void>;
}
