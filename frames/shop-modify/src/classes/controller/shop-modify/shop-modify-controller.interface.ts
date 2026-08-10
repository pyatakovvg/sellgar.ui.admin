import type { CreateShopInput, ShopEntity, UpdateShopInput } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';

export type ShopModifyActionPayload = CreateShopInput | UpdateShopInput;

export abstract class ShopModifyControllerInterface extends FrameControllerInterface<ShopModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<ShopModifyFrameParams>): Promise<ShopEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<ShopModifyFrameParams, ShopModifyActionPayload>): Promise<void>;

  abstract close(): Promise<void>;
}
