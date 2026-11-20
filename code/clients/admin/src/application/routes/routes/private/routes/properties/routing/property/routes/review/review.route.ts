import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const propertyReviewRoute = new Route({
  token: Tokens.PropertyReviewRoute,
  address: segments('property', param('code')),
  load: () => import('@frame/property-review'),
});
