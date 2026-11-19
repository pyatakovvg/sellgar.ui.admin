import { Inject, Injectable } from '@sellgar/app';

import type { CartEntity } from '../domain/cart.entity.ts';
import type { CartResultEntity } from '../domain/cart-result.entity.ts';
import type { CartItemMutationEntity } from '../domain/cart-item-mutation.entity.ts';
import type { CartQueryInput } from '../data/gateway/input/cart-query.input.ts';
import type { AddCartItemInput } from '../data/gateway/input/add-cart-item.input.ts';
import type { SetCartItemQuantityInput } from '../data/gateway/input/set-cart-item-quantity.input.ts';
import type { RemoveCartItemInput } from '../data/gateway/input/remove-cart-item.input.ts';
import { CartGatewayInterface } from '../data/gateway/cart-gateway.interface.ts';
import { CartServiceInterface } from './cart-service.interface.ts';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(@Inject(CartGatewayInterface) private readonly cartGateway: CartGatewayInterface) {}

  getAll(query?: CartQueryInput): Promise<CartResultEntity> {
    return this.cartGateway.getAll(query);
  }

  findByUuid(uuid: string): Promise<CartEntity> {
    return this.cartGateway.findByUuid(uuid);
  }

  addItem(uuid: string, input: AddCartItemInput): Promise<CartItemMutationEntity> {
    return this.cartGateway.addItem(uuid, input);
  }

  setItemQuantity(uuid: string, recordUuid: string, input: SetCartItemQuantityInput): Promise<CartItemMutationEntity> {
    return this.cartGateway.setItemQuantity(uuid, recordUuid, input);
  }

  removeItem(uuid: string, recordUuid: string, input: RemoveCartItemInput): Promise<CartItemMutationEntity> {
    return this.cartGateway.removeItem(uuid, recordUuid, input);
  }
}
