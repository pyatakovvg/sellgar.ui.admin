import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const brandCreateRoute = new Route({
  token: Tokens.BrandCreateRoute,
  address: segments('brand', 'create'),
  load: () => import('@frame/brand-modify'),
});
