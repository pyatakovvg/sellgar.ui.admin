import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const productModifyRoute = new Route({
  token: Tokens.ProductModifyRoute,
  address: segments(param('uuid')),
  load: () => import('@module/product-modify'),
});
