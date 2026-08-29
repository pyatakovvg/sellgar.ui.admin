import type { ShopEntity } from '@library/domain';

export abstract class ShopListControllerInterface {
  abstract loader(): Promise<ShopEntity[]>;
}
