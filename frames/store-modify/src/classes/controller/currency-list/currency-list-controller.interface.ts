import type { CurrencyEntity } from '@library/domain';

export abstract class CurrencyListControllerInterface {
  abstract loader(): Promise<CurrencyEntity[]>;
}
