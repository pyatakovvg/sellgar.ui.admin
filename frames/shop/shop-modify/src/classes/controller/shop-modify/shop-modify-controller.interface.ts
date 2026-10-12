import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';
import { ShopEntity } from '@library/domain';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';
import type { ShopFormInput } from './input/shop-form.input.ts';

export abstract class ShopModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>): Promise<ShopEntity>;
  abstract action(args: ControllerArgs<WithPayload<ShopFormInput, WithParams<ShopModifyFrameParams>>>): Promise<void>;
  abstract toReview(uuid: string): Promise<void>;
}
