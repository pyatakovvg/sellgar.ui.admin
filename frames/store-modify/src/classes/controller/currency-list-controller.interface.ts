import { CurrencyEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';

import { StoreModifyFrameParams } from '../params';

export abstract class CurrencyListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<CurrencyEntity[]>;
}
