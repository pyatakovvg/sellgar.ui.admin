import { CurrencyServiceInterface, type CurrencyEntity } from '@library/domain';
import { Controller, Inject } from '@sellgar/app-v2';

import { CurrencyListControllerInterface } from './currency-list-controller.interface.ts';
@Controller()
export class CurrencyListController implements CurrencyListControllerInterface {
  constructor(@Inject(CurrencyServiceInterface) private readonly currencyService: CurrencyServiceInterface) {}

  async loader(): Promise<CurrencyEntity[]> {
    const result = await this.currencyService.findAll();

    return result.data;
  }
}
