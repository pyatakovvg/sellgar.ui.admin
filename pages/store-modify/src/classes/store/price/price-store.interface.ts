import { PriceEntity } from '@library/domain';

export abstract class PriceStoreInterface {
  abstract inProcess: boolean;
  abstract prices: PriceEntity[];

  abstract setInProcess(state: boolean): void;
  abstract setPrices(prices: PriceEntity[]): void;
}
