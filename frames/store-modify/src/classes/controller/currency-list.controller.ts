import { CurrencyEntity, CurrencyServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { CurrencyListControllerInterface } from './currency-list-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class CurrencyListController implements CurrencyListControllerInterface {
  constructor(@Inject(CurrencyServiceInterface) private readonly currencyService: CurrencyServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<CurrencyEntity[]> {
    const result = await this.currencyService.findAll();

    return result.data;
  }
}
