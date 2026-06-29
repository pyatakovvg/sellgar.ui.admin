import { VariantEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';

import { StoreModifyFrameParams } from '../params';

export abstract class VariantListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<VariantEntity[]>;
}
