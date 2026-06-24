import { CurrencyEntity } from '@library/domain';

export abstract class CurrencyStoreInterface {
  abstract currency: CurrencyEntity[];

  abstract setCurrency(data: CurrencyEntity[]): void;
}
