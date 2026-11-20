import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { cartRouting } from './routing/cart';

export const cartsRoute = new Route({
  token: Tokens.CartsRoute,
  address: segments('carts'),
  load: () => import('@module/carts'),
  routing: [cartRouting],
});
