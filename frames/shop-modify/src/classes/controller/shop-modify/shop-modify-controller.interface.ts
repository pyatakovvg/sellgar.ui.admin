import type { CreateShopInput, ShopEntity, UpdateShopInput } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app-v2';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';

export type ShopModifyActionPayload = CreateShopInput | UpdateShopInput;

export abstract class ShopModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>): Promise<ShopEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<ShopModifyActionPayload, WithParams<ShopModifyFrameParams>>>): Promise<void>;

  abstract close(): Promise<void>;
}
