import { param, segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { CartReviewRoute } from '@library/route-tokens';

export const CartRouting = new Router({
  routes: [
    new Route({
      token: CartReviewRoute,
      address: segments('cart', param('uuid')),
      load: () => import('@frame/cart-review'),
    }),
  ],
});
