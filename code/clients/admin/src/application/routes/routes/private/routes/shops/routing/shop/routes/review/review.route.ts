import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const shopReviewRoute = new Route({
  token: Tokens.ShopReviewRoute,
  address: segments('shop', param('uuid')),
  load: () => import('@frame/shop-review'),
});
