import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const brandModifyRoute = new Route({
  token: Tokens.BrandModifyRoute,
  address: segments('brand', param('code'), 'edit'),
  load: () => import('@frame/brand-modify'),
});
