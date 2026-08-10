import type { ShopResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class ShopControllerInterface implements ControllerInterface {
  abstract loader(): Promise<ShopResultEntity>;
}
