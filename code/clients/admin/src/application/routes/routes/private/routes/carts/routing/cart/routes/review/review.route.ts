import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const cartReviewRoute = new Route({
  token: Tokens.CartReviewRoute,
  address: segments('cart', param('uuid')),
  load: () => import('@frame/cart-review'),
});
