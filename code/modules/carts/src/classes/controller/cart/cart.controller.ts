import { Controller, Inject } from '@sellgar/app';

import { CartServiceInterface } from '@library/domain';

import { CartControllerInterface } from './cart-controller.interface.ts';

@Controller()
export class CartController implements CartControllerInterface {
  constructor(@Inject(CartServiceInterface) private readonly carts: CartServiceInterface) {}

  loader() {
    return this.carts.getAll();
  }
}
