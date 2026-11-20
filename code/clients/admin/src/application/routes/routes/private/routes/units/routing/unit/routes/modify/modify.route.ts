import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const unitModifyRoute = new Route({
  token: Tokens.UnitModifyRoute,
  address: segments('unit', param('code'), 'edit'),
  load: () => import('@frame/unit-modify'),
});
