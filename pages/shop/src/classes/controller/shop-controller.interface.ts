import { ShopResultEntity } from '@library/domain';

export abstract class ShopControllerInterface {
  abstract loader(): Promise<ShopResultEntity>;
}
