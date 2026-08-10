import type { CurrencyEntity } from '@library/domain';
import { FrameControllerInterface } from '@sellgar/app';

import { StoreModifyFrameParams } from '../../params/frame.params.ts';

export abstract class CurrencyListControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(): Promise<CurrencyEntity[]>;
}
