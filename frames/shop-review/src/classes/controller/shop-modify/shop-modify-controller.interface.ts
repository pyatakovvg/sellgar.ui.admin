import type { ControllerArgs, WithParams } from '@sellgar/app';
import { ShopEntity } from '@library/domain';

import { ShopModifyFrameParams } from '../../params/frame.params.ts';

export abstract class ShopModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<ShopModifyFrameParams>>): Promise<ShopEntity>;
  abstract toModify(uuid: string): Promise<void>;
}
