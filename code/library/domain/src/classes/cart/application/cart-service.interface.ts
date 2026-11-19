import type { CartEntity } from '../domain/cart.entity.ts';
import type { CartResultEntity } from '../domain/cart-result.entity.ts';
import type { CartItemMutationEntity } from '../domain/cart-item-mutation.entity.ts';
import type { CartQueryInput } from '../data/gateway/input/cart-query.input.ts';
import type { AddCartItemInput } from '../data/gateway/input/add-cart-item.input.ts';
import type { SetCartItemQuantityInput } from '../data/gateway/input/set-cart-item-quantity.input.ts';
import type { RemoveCartItemInput } from '../data/gateway/input/remove-cart-item.input.ts';

export abstract class CartServiceInterface {
  abstract getAll(query?: CartQueryInput): Promise<CartResultEntity>;

  abstract findByUuid(uuid: string): Promise<CartEntity>;

  abstract addItem(uuid: string, input: AddCartItemInput): Promise<CartItemMutationEntity>;

  abstract setItemQuantity(
    uuid: string,
    recordUuid: string,
    input: SetCartItemQuantityInput,
  ): Promise<CartItemMutationEntity>;

  abstract removeItem(uuid: string, recordUuid: string, input: RemoveCartItemInput): Promise<CartItemMutationEntity>;
}
