import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const unitReviewRoute = new Route({
  token: Tokens.UnitReviewRoute,
  address: segments('unit', param('code')),
  load: () => import('@frame/unit-review'),
});
