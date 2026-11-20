import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const storeReviewRoute = new Route({
  token: Tokens.StoreReviewRoute,
  address: segments('store', param('uuid')),
  load: () => import('@frame/store-review'),
});
