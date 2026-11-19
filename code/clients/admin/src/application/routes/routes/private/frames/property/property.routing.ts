import * as Tokens from '@library/route-tokens';
import { segments, param } from '@sellgar/app';
import { Router, Route } from '@sellgar/app/react';

export const PropertyRouting = new Router({
  routes: [
    new Route({
      token: Tokens.PropertyModifyRoute,
      address: segments('property', param('code'), 'edit'),
      load: () => import('@frame/property-modify'),
    }),
    new Route({
      token: Tokens.PropertyCreateRoute,
      address: segments('property', 'create'),
      load: () => import('@frame/property-modify'),
    }),
    new Route({
      token: Tokens.PropertyReviewRoute,
      address: segments('property', param('code')),
      load: () => import('@frame/property-review'),
    }),
  ],
});
