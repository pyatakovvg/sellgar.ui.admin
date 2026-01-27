import { ShopEntity } from '@library/domain';

export abstract class ShopStoreInterface {
  abstract shops: ShopEntity[];

  abstract setShops(data: ShopEntity[]): void;
}
