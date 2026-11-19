import type { CartResultEntity } from '@library/domain';

export abstract class CartControllerInterface {
  abstract loader(): Promise<CartResultEntity>;
}
