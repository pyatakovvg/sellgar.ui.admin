import * as Tokens from '@library/route-tokens';
import { segments, param } from '@sellgar/app';
import { Router, Route } from '@sellgar/app/react';
export const StoreRouting = new Router({
  routes: [
    new Route({
      token: Tokens.StoreModifyRoute,
      address: segments('store', param('uuid'), 'edit'),
      load: () => import('@frame/store-modify'),
    }),
    new Route({
      token: Tokens.StoreCreateRoute,
      address: segments('store', 'create'),
      load: () => import('@frame/store-modify'),
    }),
    new Route({
      token: Tokens.StoreReviewRoute,
      address: segments('store', param('uuid')),
      load: () => import('@frame/store-review'),
    }),
  ],
});
