import { Controller, Inject, isHttpException } from '@sellgar/app';

import { CartServiceInterface } from '@library/domain';

import { CartReviewControllerInterface } from './cart-review-controller.interface.ts';

@Controller()
export class CartReviewController implements CartReviewControllerInterface {
  constructor(@Inject(CartServiceInterface) private readonly carts: CartServiceInterface) {}

  async loader({ params }: Parameters<CartReviewControllerInterface['loader']>[0]) {
    if (!params.uuid) throw new Error('Не указана корзина для просмотра');

    try {
      return await this.carts.findByUuid(params.uuid);
    } catch (error) {
      if (isHttpException(error) && error.status === 404) return null;

      throw error;
    }
  }
}
