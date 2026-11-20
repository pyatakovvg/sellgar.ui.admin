import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { unitRouting } from './routing/unit';

export const unitsRoute = new Route({
  token: Tokens.UnitsRoute,
  address: segments('units'),
  load: () => import('@module/units'),
  routing: [unitRouting],
});
