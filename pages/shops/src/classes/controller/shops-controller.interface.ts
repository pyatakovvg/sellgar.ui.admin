import { ShopResultEntity } from '@library/domain';

export abstract class ShopsControllerInterface {
  abstract loader(): Promise<ShopResultEntity>;
}
