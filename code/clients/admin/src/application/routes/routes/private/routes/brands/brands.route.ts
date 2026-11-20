import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { brandRouting } from './routing/brand';

export const brandsRoute = new Route({
  token: Tokens.BrandsRoute,
  address: segments('brands'),
  load: () => import('@module/brands'),
  routing: [brandRouting],
});
