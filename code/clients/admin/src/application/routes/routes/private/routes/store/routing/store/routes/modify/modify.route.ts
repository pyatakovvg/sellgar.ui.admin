import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const storeModifyRoute = new Route({
  token: Tokens.StoreModifyRoute,
  address: segments('store', param('uuid'), 'edit'),
  load: () => import('@frame/store-modify'),
});
