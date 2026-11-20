import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const brandReviewRoute = new Route({
  token: Tokens.BrandReviewRoute,
  address: segments('brand', param('code')),
  load: () => import('@frame/brand-review'),
});
