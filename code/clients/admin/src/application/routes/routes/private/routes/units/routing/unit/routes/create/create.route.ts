import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const unitCreateRoute = new Route({
  token: Tokens.UnitCreateRoute,
  address: segments('unit', 'create'),
  load: () => import('@frame/unit-modify'),
});
