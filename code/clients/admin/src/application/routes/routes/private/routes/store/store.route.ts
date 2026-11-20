import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { storeRouting } from './routing/store';
import { storeInventoryRouting } from './routing/inventory';

export const storeRoute = new Route({
  token: Tokens.StoreRoute,
  address: segments('store'),
  load: () => import('@module/store'),
  routing: [storeRouting, storeInventoryRouting],
});
