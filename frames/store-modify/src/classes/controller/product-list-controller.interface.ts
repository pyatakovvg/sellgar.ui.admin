import { ProductEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@sellgar/app';

import { StoreModifyFrameParams } from '../params';

export abstract class ProductListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<ProductEntity[]>;
}
