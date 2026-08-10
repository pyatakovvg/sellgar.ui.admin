import type { ProductEntity } from '@library/domain';
import { FrameControllerInterface } from '@sellgar/app';

import { StoreModifyFrameParams } from '../../params/frame.params.ts';

export abstract class ProductListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(): Promise<ProductEntity[]>;
}
