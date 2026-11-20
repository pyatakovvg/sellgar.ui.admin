import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { shopRouting } from './routing/shop';

export const shopsRoute = new Route({
  token: Tokens.ShopsRoute,
  address: segments('shops'),
  load: () => import('@module/shops'),
  routing: [shopRouting],
});
