import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const storeInventoryRoute = new Route({
  token: Tokens.StoreInventoryRoute,
  address: segments('store-inventory', param('storeProductUuid'), param('recordUuid')),
  load: () => import('@frame/store-inventory'),
});
