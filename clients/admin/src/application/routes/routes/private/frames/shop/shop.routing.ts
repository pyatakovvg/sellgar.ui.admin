import * as Tokens from '@library/route-tokens';
import { segments, param } from '@sellgar/app';
import { Router, Route } from '@sellgar/app/react';

export const ShopRouting = new Router({
  routes: [
    new Route({
      token: Tokens.ShopModifyRoute,
      address: segments('shop', param('uuid'), 'edit'),
      load: () => import('@frame/shop-modify'),
    }),
    new Route({
      token: Tokens.ShopCreateRoute,
      address: segments('shop', 'create'),
      load: () => import('@frame/shop-modify'),
    }),
    new Route({
      token: Tokens.ShopReviewRoute,
      address: segments('shop', param('uuid')),
      load: () => import('@frame/shop-review'),
    }),
  ],
});
