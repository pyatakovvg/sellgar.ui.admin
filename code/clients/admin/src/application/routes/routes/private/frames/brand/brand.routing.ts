import * as Tokens from '@library/route-tokens';
import { segments, param } from '@sellgar/app';
import { Router, Route } from '@sellgar/app/react';

export const BrandRouting = new Router({
  routes: [
    new Route({
      token: Tokens.BrandModifyRoute,
      address: segments('brand', param('code'), 'edit'),
      load: () => import('@frame/brand-modify'),
    }),
    new Route({
      token: Tokens.BrandCreateRoute,
      address: segments('brand', 'create'),
      load: () => import('@frame/brand-modify'),
    }),
    new Route({
      token: Tokens.BrandReviewRoute,
      address: segments('brand', param('code')),
      load: () => import('@frame/brand-review'),
    }),
  ],
});
