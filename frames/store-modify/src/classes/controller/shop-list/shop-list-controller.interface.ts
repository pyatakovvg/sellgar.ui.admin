import type { ShopEntity } from '@library/domain';
import { FrameControllerInterface } from '@sellgar/app';

import { StoreModifyFrameParams } from '../../params/frame.params.ts';

export abstract class ShopListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(): Promise<ShopEntity[]>;
}
