import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const propertyModifyRoute = new Route({
  token: Tokens.PropertyModifyRoute,
  address: segments('property', param('code'), 'edit'),
  load: () => import('@frame/property-modify'),
});
