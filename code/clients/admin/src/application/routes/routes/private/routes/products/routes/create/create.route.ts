import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const productCreateRoute = new Route({
  token: Tokens.ProductCreateRoute,
  address: segments('create'),
  load: () => import('@module/product-modify'),
});
