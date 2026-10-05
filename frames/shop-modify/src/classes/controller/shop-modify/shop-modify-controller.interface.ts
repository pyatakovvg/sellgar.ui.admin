import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';
import type { ShopModifyEntity } from './domain/shop-modify.entity.ts';
import type { ShopFormInput } from './input/shop-form.input.ts';

export abstract class ShopModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>): Promise<ShopModifyEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<ShopFormInput, WithParams<ShopModifyFrameParams>>>): Promise<void>;

  abstract close(): Promise<void>;
}
