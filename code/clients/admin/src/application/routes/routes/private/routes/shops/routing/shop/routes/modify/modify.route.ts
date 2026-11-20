import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const shopModifyRoute = new Route({
  token: Tokens.ShopModifyRoute,
  address: segments('shop', param('uuid'), 'edit'),
  load: () => import('@frame/shop-modify'),
});
