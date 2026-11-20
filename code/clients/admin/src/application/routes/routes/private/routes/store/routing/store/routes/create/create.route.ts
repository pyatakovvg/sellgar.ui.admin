import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const storeCreateRoute = new Route({
  token: Tokens.StoreCreateRoute,
  address: segments('store', 'create'),
  load: () => import('@frame/store-modify'),
});
