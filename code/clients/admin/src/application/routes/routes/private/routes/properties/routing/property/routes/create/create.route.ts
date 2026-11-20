import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const propertyCreateRoute = new Route({
  token: Tokens.PropertyCreateRoute,
  address: segments('property', 'create'),
  load: () => import('@frame/property-modify'),
});
