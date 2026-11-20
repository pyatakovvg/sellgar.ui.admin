import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const shopCreateRoute = new Route({
  token: Tokens.ShopCreateRoute,
  address: segments('shop', 'create'),
  load: () => import('@frame/shop-modify'),
});
