import * as Tokens from '@library/route-tokens';
import { segments, param } from '@sellgar/app';
import { Router, Route } from '@sellgar/app/react';

export const UnitRouting = new Router({
  routes: [
    new Route({
      token: Tokens.UnitModifyRoute,
      address: segments('unit', param('code'), 'edit'),
      load: () => import('@frame/unit-modify'),
    }),
    new Route({
      token: Tokens.UnitCreateRoute,
      address: segments('unit', 'create'),
      load: () => import('@frame/unit-modify'),
    }),
    new Route({
      token: Tokens.UnitReviewRoute,
      address: segments('unit', param('code')),
      load: () => import('@frame/unit-review'),
    }),
  ],
});
